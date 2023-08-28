import { useSession } from "next-auth/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { ToastOptions, toast } from 'react-toastify';
import { axiosPublic } from '../../axios';
import { api_routes } from '@/helper/routes';
import { AxiosResponse } from "axios";
import Spinner from "./Spinner";
import Modal from 'react-modal';
import { BillingAddressType } from "@/helper/types";

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

const toastConfig: ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

type Props = {
    getSelectedItem?: (data:number)=>void;
}

export default function BillingAddress({getSelectedItem}:Props) {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [billingAddresses, setBillingAddresses] = useState<BillingAddressType[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<{
        status: boolean,
        id: number|null
    }>({ status: false, id: null});
    const { status, data: session } = useSession();
    const [selected, setSelected] = useState(0);
    

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

    useEffect(() => {
        getBillingAddress();

        return () => { }
    }, [status])

    const getBillingAddress = useCallback(
        async () => {
            setDataLoading(true)
            try {
                const response: AxiosResponse = await axiosPublic.get(api_routes.billing_address_all, {
                    headers: { "Authorization": `Bearer ${session?.user.token}` }
                });
                setBillingAddresses([...response.data.data])
                if(response.data.data.length>0){
                    setSelected(response.data.data[0].id)
                    getSelectedItem && getSelectedItem(response.data.data[0].id)
                }

            } catch (error) {
                console.log(error);
            }finally {
                setDataLoading(false)
            }
        },
        [status, getSelectedItem],
    )

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await axiosPublic.post(isEdit.status ? api_routes.billing_address_update+`/${isEdit.id}`: api_routes.billing_address_create, { ...data, is_active:true }, {
                headers: { "Authorization": `Bearer ${session?.user.token}` }
            });
            toast.success(response.data.message, toastConfig);
            if(isEdit.status){
                const updatedBillingAddressIndex = billingAddresses.findIndex(item=>item.id==isEdit.id);
                const updatedBillingAddress = [...billingAddresses];
                updatedBillingAddress[updatedBillingAddressIndex] = response.data.billingAddress;
                setBillingAddresses([...updatedBillingAddress]);
            }else{
                setBillingAddresses([response.data.billingAddress, ...billingAddresses]);
            }
            hideModal();
        } catch (error: any) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message, toastConfig);
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
            const response = await axiosPublic.delete(api_routes.billing_address_delete+`/${id}`, {
                headers: { "Authorization": `Bearer ${session?.user.token}` }
            });
            const updatedBillingAddress = billingAddresses.filter(item=>item.id!==id);
            setBillingAddresses([...updatedBillingAddress]);
            toast.success(response.data.message, toastConfig);
        } catch (error) {
            console.log(error);
            toast.error('Oops. something went wrong! please try again later.', toastConfig);
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
                        (!dataLoading && billingAddresses.length===0) && <div className="col-12 text-center">
                            <p>Oops. No address available. Please add one!</p>
                        </div>
                    }
                    {
                        dataLoading && loadingArr.map( i => <div className="col-sm-6 col-lg-4" key={i}>
                            <div className="blog-small-img-loading"></div>
                        </div>)
                    }
                    {
                        billingAddresses.map((item, i)=><div className="col-md-6 col-lg-4 alert fade show" key={i}>
                        <div className={`profile-card address ${selected===item.id ? 'active' : ''}`} onClick={()=>{setSelected(item.id); getSelectedItem && getSelectedItem(item.id)}}>
                            <h6>{item.country}</h6>
                            <p>
                                {item.address}, {item.city}, {item.state} - {item.pin}, {item.country}
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