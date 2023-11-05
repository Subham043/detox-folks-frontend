import Link from 'next/link'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { ToastOptions, toast } from 'react-toastify';
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Spinner from '@/components/Spinner';
import { LoginModalContext } from '@/context/LoginModalProvider';
import { CartContext } from '@/context/CartProvider';


const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
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


export default function LoginModal() {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";
    const { showLogin, hideLogin } = useContext(LoginModalContext);
    const { fetchCart } = useContext(CartContext);


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
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });
            if (!res?.error) {
                fetchCart()
                if(showLogin){
                    hideLogin();
                }else{
                    router.push(callbackUrl);
                }
                reset({
                    email: "",
                    password: "",
                });
            } else {
                toast.error("Invalid Credentials", toastConfig);
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="user-form-card">
                <div className="user-form-title">
                    <h2>welcome!</h2>
                    <p>Use your credentials to access</p>
                </div>
                <div className="user-form-group">
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
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="check"
                            /><label className="form-check-label" htmlFor="check"
                            >Remember Me</label
                            >
                        </div>
                        <div className="form-button">
                            <button type="submit" disabled={loading}>
                                {
                                    loading ? <Spinner /> : <>
                                        login
                                    </>
                                }
                            </button>
                            <p>
                                Forgot your password?<Link href="/forgot-password"
                                >reset here</Link
                                >
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="user-form-remind">
                <p>
                    Don&apos;t have any account?<Link href="/register">register here</Link>
                </p>
            </div>
        </>
    )
}
