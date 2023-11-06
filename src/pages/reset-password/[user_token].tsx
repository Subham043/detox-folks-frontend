import Head from 'next/head'
import Link from 'next/link'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import { axiosPublic } from '../../../axios';
import { api_routes } from '@/helper/routes';
import { ErrorMessage } from '@hookform/error-message';
import Spinner from '@/components/Spinner';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/navigation';
import { getSession } from "next-auth/react"
import { useToast } from '@/hook/useToast';

type ServerSideProps = {
    user_token: string;
}

export const getServerSideProps: GetServerSideProps<{
    repo: ServerSideProps
}> = async (ctx: any) => {
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
        props: {
            repo: {
                user_token: ctx?.params.user_token,
            }
        }
    }
}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    password_confirmation: yup.string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export default function ResetPassword({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [loading, setLoading] = useState(false);
    const { toastSuccess, toastError } = useToast();

    const router = useRouter();

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
          const response = await axiosPublic.post(api_routes.reset_password+`/${repo.user_token}`, {...data});
          toastSuccess(response.data.message);            
          reset({
            email: "",
            password: "",
            password_confirmation: "",
          });
          router.push('/login');
        } catch (error: any) {
          console.log(error);
          if (error?.response?.data?.message) {
            toastError(error?.response?.data?.message);
          }
          if (error?.response?.data?.errors?.email) {
            setError("email", {
              type: "server",
              message: error?.response?.data?.errors?.email[0],
            });
            setError("password", {
              type: "server",
              message: error?.response?.data?.errors?.password[0],
            });
            setError("password_confirmation", {
              type: "server",
              message: error?.response?.data?.errors?.password_confirmation[0],
            });
          }
        } finally {
          setLoading(false);
        }
      };

    return (
        <>
            <Head>
                <title>Parcelcounter - Reset Password</title>
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
                                    <h2>worried?</h2>
                                    <p>No Problem! Just Follow The Simple Way</p>
                                </div>
                                <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
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
                                            placeholder="Enter your confirm password"
                                            {...register('password_confirmation')}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name='password_confirmation'
                                            as={<div style={{ color: 'red' }} />}
                                        />
                                    </div>
                                    <div className="form-button">
                                        <button type="submit" disabled={loading}>
                                          {
                                            loading ? <Spinner/> : <>
                                              send reset link
                                            </>
                                          }
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="user-form-remind mb-5">
                                <p>Go Back To<Link href="/login">login here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
