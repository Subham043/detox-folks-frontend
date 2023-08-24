import { useSession } from "next-auth/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { ToastOptions, toast } from 'react-toastify';
import { axiosPublic } from '../../axios';
import { api_routes } from '@/helper/routes';
import Spinner from "./Spinner";

const schema = yup
  .object({
    old_password: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .oneOf([yup.ref('password')], 'Passwords must match'),
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

export default function PasswordCard() {
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

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
          const response = await axiosPublic.post(api_routes.password_update, {...data}, {
            headers: {"Authorization" : `Bearer ${session?.user.token}`}
          });
          toast.success(response.data.message, toastConfig); 
          reset({
            old_password: "",
            password: "",
            confirm_password: "",
          });
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toast.error(error?.response?.data?.message, toastConfig);
          }
          if (error?.response?.data?.errors?.old_password) {
            setError("old_password", {
              type: "server",
              message: error?.response?.data?.errors?.old_password[0],
            });
          }
          if (error?.response?.data?.errors?.password) {
            setError("password", {
              type: "server",
              message: error?.response?.data?.errors?.password[0],
            });
          }
          if (error?.response?.data?.errors?.confirm_password) {
            setError("confirm_password", {
              type: "server",
              message: error?.response?.data?.errors?.confirm_password[0],
            });
          }
        } finally {
          setLoading(false);
        }
    };

    return <div className="account-card">
        <div className="account-title">
            <h4>Password Setting</h4>
        </div>
        <div className="account-content">
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6 col-lg-3">
                        <div className="form-group">
                            <label className="form-label">Old Password</label
                            ><input
                                className="form-control"
                                type="password"
                                {...register('old_password')}
                            />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          name='old_password'
                          as={<div style={{ color: 'red' }} />}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="form-group">
                            <label className="form-label">New Password</label
                            ><input
                                className="form-control"
                                type="password"
                                {...register('password')}
                            />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          name='password'
                          as={<div style={{ color: 'red' }} />}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label
                            ><input
                                className="form-control"
                                type="password"
                                {...register('confirm_password')}
                            />
                        </div>
                        <ErrorMessage
                          errors={errors}
                          name='confirm_password'
                          as={<div style={{ color: 'red' }} />}
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="profile-btn text-center">
                            <button className="btn btn-success btn-sm px-2 py-2" type="submit" disabled={loading}>
                              {
                                loading ? <Spinner/> : <>
                                  Update Password
                                </>
                              }
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
}