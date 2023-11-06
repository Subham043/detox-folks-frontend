import { useSession } from "next-auth/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { api_routes } from '@/helper/routes';
import Spinner from "./Spinner";
import { useAxiosPrivate } from "@/hook/useAxiosPrivate";
import { useToast } from "@/hook/useToast";
import useSWR from 'swr'

type UserType = {
  user: {
    email:string;
    id:number;
    name:string;
    phone:string;
    roles: string[];
    verified: string;
  }
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

export default function ProfileCard() {
    const [loading, setLoading] = useState(false);
    const { status, data: session, update: sessionUpdate } = useSession();
    const axiosPrivate = useAxiosPrivate();
    const { toastSuccess, toastError } = useToast();

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

    const { data, mutate } = useSWR<UserType>(status==='authenticated' ? api_routes.profile : null);

    useEffect(() => {
      if(status==='authenticated'){
        setValue("email", data ? data.user.email : '')
        setValue("phone", data ? data.user.phone : '')
        setValue("name", data ? data.user.name : '')
      }
      
        return () => {}
    }, [status, data])

    const onSubmit = async (form_data: any) => {
        setLoading(true);
        try {
          const response = await axiosPrivate.post(api_routes.profile_update, {...form_data});
          toastSuccess(response.data.message); 
          mutate({...data, user:{
            ...data?.user, ...form_data
          }})
          sessionUpdate({
            profile: {
              ...form_data
            }
          })
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
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
                <div className="row justify-content-center">
                    <div className="col-md-4 col-lg-4">
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
                    <div className="col-md-4 col-lg-4">
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
                    <div className="col-md-4 col-lg-4">
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
                    <div className="col-md-4 col-lg-4">
                        <div className="profile-btn text-center mt-0">
                            <button className="btn btn-success btn-sm px-2 py-2" type="submit" disabled={loading}>
                              {
                                loading ? <Spinner/> : <>
                                  Update Profile
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