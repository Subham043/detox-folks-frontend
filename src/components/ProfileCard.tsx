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

const toastConfig:ToastOptions = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export default function ProfileCard() {
    const [loading, setLoading] = useState(false);
    const { status, data: session } = useSession();

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
        getProfileDetails();
      
        return () => {}
    }, [status])

    const getProfileDetails = useCallback(
        async() => {
          try {
            const response:AxiosResponse = await axiosPublic.get(api_routes.profile, {
              headers: {"Authorization" : `Bearer ${session?.user.token}`}
            });
            setValue("name", response.data.user.name)
            setValue("email", response.data.user.email)
            setValue("phone", response.data.user.phone)
            
          } catch (error) {
            console.log(error);
          }
        },
        [status],
    )

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.profile_update, {...data}, {
            headers: {"Authorization" : `Bearer ${session?.user.token}`}
          });
          toast.success(response.data.message, toastConfig); 
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

    return <div className="account-card">
        <div className="account-title">
            <h4>Your Profile</h4>
        </div>
        <div className="account-content">
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6 col-lg-3">
                        <div className="form-group">
                            <label className="form-label">name</label
                            ><input
                                className="form-control"
                                type="text"
                                {...register('name')}
                            />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          name='name'
                          as={<div style={{ color: 'red' }} />}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="form-group">
                            <label className="form-label">Email</label
                            ><input
                                className="form-control"
                                type="email"
                                {...register('email')}
                            />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          name='email'
                          as={<div style={{ color: 'red' }} />}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="form-group">
                            <label className="form-label">Phone</label
                            ><input
                                className="form-control"
                                type="text"
                                {...register('phone')}
                            />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          name='phone'
                          as={<div style={{ color: 'red' }} />}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="profile-btn text-center">
                            <button className="btn btn-success btn-sm px-2 py-2" type="submit" disabled={loading}>{loading? 'Updating' : 'Update'} Profile</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
}