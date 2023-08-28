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
import { BillingInformationType } from "@/helper/types";

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
        email: yup.string().email().required(),
        name: yup.string().required(),
        phone: yup
        .string()
        .required()
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
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

export default function BillingInformation({getSelectedItem}:Props) {
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [billingInformations, setBillingInformations] = useState<BillingInformationType[]>([]);
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
        getBillingInformation();

        return () => { }
    }, [status])

    const getBillingInformation = useCallback(
        async () => {
            setDataLoading(true)
            try {
                const response: AxiosResponse = await axiosPublic.get(api_routes.billing_information_all, {
                    headers: { "Authorization": `Bearer ${session?.user.token}` }
                });
                setBillingInformations([...response.data.data])
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
            const response = await axiosPublic.post(isEdit.status ? api_routes.billing_information_update+`/${isEdit.id}`: api_routes.billing_information_create, { ...data, is_active:true }, {
                headers: { "Authorization": `Bearer ${session?.user.token}` }
            });
            toast.success(response.data.message, toastConfig);
            if(isEdit.status){
                const updatedBillingInformationIndex = billingInformations.findIndex(item=>item.id==isEdit.id);
                const updatedBillingInformation = [...billingInformations];
                updatedBillingInformation[updatedBillingInformationIndex] = response.data.billingInformation;
                setBillingInformations([...updatedBillingInformation]);
            }else{
                setBillingInformations([response.data.billingInformation, ...billingInformations]);
            }
            hideModal();
        } catch (error: any) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message, toastConfig);
            }
            if (error?.response?.data?.errors?.name) {
                setError("name", {
                  type: "server",
                  message: error?.response?.data?.errors?.name[0],
                });
              }
              if (error?.response?.data?.errors?.email) {
                setError("email", {
                  type: "server",
                  message: error?.response?.data?.errors?.email[0],
                });
              }
              if (error?.response?.data?.errors?.phone) {
                setError("phone", {
                  type: "server",
                  message: error?.response?.data?.errors?.phone[0],
                });
              }
        } finally {
            setLoading(false);
        }
    };

    const deleteHandler = async (id: number) => {
        setLoading(true)
        try {
            const response = await axiosPublic.delete(api_routes.billing_information_delete+`/${id}`, {
                headers: { "Authorization": `Bearer ${session?.user.token}` }
            });
            const updatedBillingInformation = billingInformations.filter(item=>item.id!==id);
            setBillingInformations([...updatedBillingInformation]);
            toast.success(response.data.message, toastConfig);
        } catch (error) {
            console.log(error);
            toast.error('Oops. something went wrong! please try again later.', toastConfig);
        }finally {
            setLoading(false)
        }
    }

    const displayModal = (item?:BillingInformationType) => {
        if(item!==undefined){
            setIsEdit({
                status: true,
                id: item.id
            })
            setValue("name", item.name)
            setValue("email", item.email)
            setValue("phone", item.phone.toString())
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
            name: "",
            email: "",
            phone: "",
        });
    }

    return <>
        <div className="account-card">
            <div className="account-title">
                <h4>Billing Information</h4>
                <button onClick={()=>displayModal()}>
                    add Info
                </button>
            </div>
            <div className="account-content">
                <div className="row">
                    {
                        (!dataLoading && billingInformations.length===0) && <div className="col-12 text-center">
                            <p>Oops. No information available. Please add one!</p>
                        </div>
                    }
                    {
                        dataLoading && loadingArr.map( i => <div className="col-sm-6 col-lg-4" key={i}>
                            <div className="blog-small-img-loading"></div>
                        </div>)
                    }
                    {
                        billingInformations.map((item, i)=><div className="col-md-6 col-lg-4 alert fade show" key={i}>
                        <div className={`profile-card address ${selected===item.id ? 'active' : ''}`} onClick={()=>{setSelected(item.id); getSelectedItem && getSelectedItem(item.id)}}>
                            <h6>{item.name}</h6>
                            <p>
                                {item.email}, {item.phone}
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
              <div className="form-title"><h3>{isEdit.status ? 'update':'add new'} Information</h3></div>
              
              <div className="form-group">
                <label className="form-label">name</label
                ><input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  {...register('name')}
                />
                <ErrorMessage
                    errors={errors}
                    name='name'
                    as={<div style={{ color: 'red' }} />}
                />
              </div>
              <div className="form-group">
                <label className="form-label">email</label
                ><input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                  {...register('email')}
                />
                <ErrorMessage
                    errors={errors}
                    name='email'
                    as={<div style={{ color: 'red' }} />}
                />
              </div>
              <div className="form-group">
                <label className="form-label">phone</label
                ><input
                  type="text"
                  className="form-control"
                  placeholder="Enter your phone"
                  {...register('phone')}
                />
                <ErrorMessage
                    errors={errors}
                    name='phone'
                    as={<div style={{ color: 'red' }} />}
                />
              </div>
              <button className="form-btn" type="submit">
                {
                    loading ? <Spinner/> : <>
                        save info
                    </>
                }
              </button>
            </form>
        </Modal>
    </>
}