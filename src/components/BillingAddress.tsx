import { useSession } from "next-auth/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { api_routes } from '@/helper/routes';
import Spinner from "./Spinner";
import Modal from 'react-modal';
import { BillingAddressResponseType, BillingAddressType } from "@/helper/types";
import useSWR from 'swr'
import { useAxiosPrivate } from "@/hook/useAxiosPrivate";
import { useToast } from "@/hook/useToast";

Modal.setAppElement('#body');
const loadingArr = [1, 2, 3]

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

const schema = yup
    .object({
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        address: yup.string().required(),
        pin: yup
            .string()
            .required(),
    })
    .required();

type Props = {
    getSelectedItem?: (data:number)=>void;
}

export default function BillingAddress({getSelectedItem}:Props) {
    const { status } = useSession();
    const { data, isLoading:dataLoading, mutate } = useSWR<BillingAddressResponseType>(status==='authenticated' ? api_routes.billing_address_all : null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<{
        status: boolean,
        id: number|null
    }>({ status: false, id: null});
    const [selected, setSelected] = useState(data && data.data.length>0 ? data.data[0].id : 0);
    const axiosPrivate = useAxiosPrivate()
    const { toastSuccess, toastError } = useToast();

    useEffect(() => {
        if(status==='authenticated' && data!==undefined){
          getSelectedItem && getSelectedItem(data && data.data.length>0 ? data.data[0].id : 0)
        }
      
        return () => {}
      }, [status, data])
    

    const {
        handleSubmit,
        control,
        setValue,
        register,
        getValues,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (form_data: any) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.post(isEdit.status ? api_routes.billing_address_update+`/${isEdit.id}`: api_routes.billing_address_create, { ...form_data, is_active:true });
            toastSuccess(response.data.message);
            if(isEdit.status){
                const updatedBillingAddressIndex = data ? data?.data.findIndex(item=>item.id==isEdit.id) : 0;
                const updatedBillingAddress = data ? [...data?.data] : [];
                updatedBillingAddress[updatedBillingAddressIndex] = response.data.billingAddress;
                mutate({...data, data:[...updatedBillingAddress]})
            }else{
                const updatedBillingAddress = data ? [...data?.data] : [];
                mutate({...data, data:[response.data.billingAddress, ...updatedBillingAddress]});
                setSelected(response.data.billingAddress.id)
                getSelectedItem && getSelectedItem(response.data.billingAddress.id)
            }
            hideModal();
        } catch (error: any) {
            console.log(error);
            if (error?.response?.data?.message) {
                toastError(error?.response?.data?.message);
            }
            if (error?.response?.data?.errors?.country) {
                setError("country", {
                    type: "server",
                    message: error?.response?.data?.errors?.country[0],
                });
            }
            if (error?.response?.data?.errors?.state) {
                setError("state", {
                    type: "server",
                    message: error?.response?.data?.errors?.state[0],
                });
            }
            if (error?.response?.data?.errors?.city) {
                setError("city", {
                    type: "server",
                    message: error?.response?.data?.errors?.city[0],
                });
            }
            if (error?.response?.data?.errors?.address) {
                setError("address", {
                    type: "server",
                    message: error?.response?.data?.errors?.address[0],
                });
            }
            if (error?.response?.data?.errors?.pin) {
                setError("pin", {
                    type: "server",
                    message: error?.response?.data?.errors?.pin[0],
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteHandler = async (id: number) => {
        setLoading(true)
        try {
            const response = await axiosPrivate.delete(api_routes.billing_address_delete+`/${id}`);
            const updatedBillingAddress = data ? data?.data.filter(item=>item.id!==id) : [];
            mutate({...data, data:[...updatedBillingAddress]})
            setSelected(updatedBillingAddress.length>0 ? updatedBillingAddress[0].id : 0)
            getSelectedItem && getSelectedItem(updatedBillingAddress.length>0 ? updatedBillingAddress[0].id : 0)
            toastSuccess(response.data.message);
        } catch (error) {
            console.log(error);
            toastError('Oops. something went wrong! please try again later.');
        }finally {
            setLoading(false)
        }
    }

    const displayModal = (item?:BillingAddressType) => {
        if(item!==undefined){
            setIsEdit({
                status: true,
                id: item.id
            })
            setValue("country", item.country)
            setValue("state", item.state)
            setValue("city", item.city)
            setValue("pin", item.pin.toString())
            setValue("address", item.address)
        }
        setShowModal(true)
    }
    
    const hideModal = () => {
        setShowModal(false)
        setIsEdit({
            status: false,
            id: null
        })
        reset({
            country: "",
            state: "",
            city: "",
            pin: "",
            address: "",
        });
    }

    return <>
        <div className="account-card">
            <div className="account-title">
                <h4>delivery address</h4>
                <button onClick={()=>displayModal()}>
                    add address
                </button>
            </div>
            <div className="account-content">
                <div className="row">
                    {
                        (!dataLoading && data?.data.length===0) && <div className="col-12 text-center">
                            <p>Oops. No address available. Please add one!</p>
                        </div>
                    }
                    {
                        dataLoading && loadingArr.map( i => <div className="col-sm-6 col-lg-4" key={i}>
                            <div className="blog-small-img-loading"></div>
                        </div>)
                    }
                    {
                        data?.data.map((item, i)=><div className="col-md-6 col-lg-4 alert fade show" key={i}>
                        <div className={`profile-card address ${selected===item.id ? 'active' : ''}`} onClick={()=>{setSelected(item.id); getSelectedItem && getSelectedItem(item.id)}}>
                            <h6>{item.country}</h6>
                            <p>
                                {item.address},<br/> {item.city},<br/> {item.state} - {item.pin},<br/> {item.country}
                            </p>
                            <ul className="user-action">
                                <li>
                                    <button
                                        className={`edit ${!loading && 'icofont-edit'}`}
                                        title="Edit This"
                                        onClick={()=>displayModal(item)}
                                    >
                                        {loading && <Spinner/>}
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={`trash ${!loading && 'icofont-ui-delete'}`}
                                        title="Remove This"
                                        disabled={loading}
                                        onClick={()=>deleteHandler(item.id)}
                                    >
                                        {loading && <Spinner/>}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>)
                    }
                </div>
            </div>
        </div>
        <Modal
            isOpen={showModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={hideModal}
            contentLabel="Address"
            style={customStyles}
          >
            <div className="col-12 p-relative clse-btn">
                <button onClick={hideModal} className="cart-close"><i className="icofont-close"></i></button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-title"><h3>{isEdit.status ? 'update':'add new'} address</h3></div>
              
              <div className="form-group">
                <label className="form-label">country</label
                ><input
                  type="text"
                  className="form-control"
                  placeholder="Enter your country"
                  {...register('country')}
                />
                <ErrorMessage
                    errors={errors}
                    name='country'
                    as={<div style={{ color: 'red' }} />}
                />
              </div>
              <div className="form-group">
                <label className="form-label">state</label
                ><input
                  type="text"
                  className="form-control"
                  placeholder="Enter your state"
                  {...register('state')}
                />
                <ErrorMessage
                    errors={errors}
                    name='state'
                    as={<div style={{ color: 'red' }} />}
                />
              </div>
              <div className="form-group">
                <label className="form-label">city</label
                ><input
                  type="text"
                  className="form-control"
                  placeholder="Enter your city"
                  {...register('city')}
                />
                <ErrorMessage
                    errors={errors}
                    name='city'
                    as={<div style={{ color: 'red' }} />}
                />
              </div>
              <div className="form-group">
                <label className="form-label">pincode</label
                ><input
                  type="text"
                  className="form-control"
                  placeholder="Enter your pincode"
                  {...register('pin')}
                />
                <ErrorMessage
                    errors={errors}
                    name='pin'
                    as={<div style={{ color: 'red' }} />}
                />
              </div>
              <div className="form-group">
                <label className="form-label">address</label
                ><textarea
                  className="form-control"
                  placeholder="Enter your address"
                  {...register('address')}
                  rows={1}
                  cols={1}
                ></textarea>
                <ErrorMessage
                    errors={errors}
                    name='address'
                    as={<div style={{ color: 'red' }} />}
                />
              </div>
              <button className="form-btn" type="submit">
                {
                    loading ? <Spinner/> : <>
                        save address info
                    </>
                }
              </button>
            </form>
        </Modal>
    </>
}