import Head from 'next/head'
import Link from 'next/link'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { signIn } from "next-auth/react";
import { axiosPublic } from '../../axios';
import { api_routes } from '@/helper/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner';
import { getSession } from "next-auth/react"
import { useToast } from '@/hook/useToast';

export const getServerSideProps = async (ctx: any) => {
  const data = await getSession(ctx)
  if(data!==null){
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
      props: {}
  }
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    phone: yup
      .string()
      .required()
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    confirm_password: yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const { toastSuccess, toastError, toastInfo } = useToast();

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
          const response = await axiosPublic.post(api_routes.register, {...data});
          // toastInfo(response.data.message); 
          toastSuccess("Registration completed successfully."); 
          const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
          }); 
          if (!res?.error) {
            router.push(callbackUrl);
            reset({
              email: "",
              name: "",
              password: "",
              confirm_password: "",
              phone: "",
            });
          } else {
            toastError("Invalid Credentials");
          }                 
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

  return (
    <>
      <Head>
        <title>Parcelcounter - Profile</title>
        <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <section className="user-form-part">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <div className="user-form-card">
                <div className="user-form-title">
                  <h2>Join Now!</h2>
                  <p>Setup A New Account In A Minute</p>
                </div>
                <div className="user-form-group">
                  <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
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
                      <input
                        type="email"
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
                      <input
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
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        {...register('password')}
                      />
                      <ErrorMessage
                          errors={errors}
                          name='password'
                          as={<div style={{ color: 'red' }} />}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter repeat password"
                        {...register('confirm_password')}
                      />
                      <ErrorMessage
                          errors={errors}
                          name='confirm_password'
                          as={<div style={{ color: 'red' }} />}
                      />
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="check"
                      /><label className="form-check-label" htmlFor="check"
                      >Accept all the <a href="#">Terms & Conditions</a></label
                      >
                    </div>
                    <div className="form-button">
                      <button type="submit" disabled={loading}>
                        {
                          loading ? <Spinner/> : <>
                            register
                          </>
                        }
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="user-form-remind mb-5">
                <p>Already Have An Account?<Link href="/login">login here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
