import Head from 'next/head'
import ContactCard from '@/components/ContactCard';
import Hero from '@/components/Hero';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import { axiosPublic } from '../../axios';
import { api_routes } from '@/helper/routes';
import { ErrorMessage } from '@hookform/error-message';
import { usePathname } from 'next/navigation'
import { ToastOptions, toast } from 'react-toastify';
import Spinner from '@/components/Spinner';

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
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


export default function Contact() {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname()
    
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
          const response = await axiosPublic.post(api_routes.enquiry, {...data, page_url: 'http://localhost'+pathname});
          toast.success(response.data.message, toastConfig);            
          reset({
            name: "",
            phone: "",
            email: "",
            message: "",
          });
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
          if (error?.response?.data?.errors?.message) {
            setError("message", {
              type: "server",
              message: error?.response?.data?.errors?.message[0],
            });
          }
        } finally {
          setLoading(false);
        }
      };

  return (
    <>
        <Head>
            <title>Detox-Folks</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/images/favicon.png" />
        </Head>
        <Hero name='Contact Us' />

        <section className="inner-section contact-part">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <ContactCard icon='icofont-location-pin' active={false} heading='head office' description='1Hd- 50, 010 Avenue, NY 90001 United States' />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <ContactCard icon='icofont-phone' active={true} heading='phone number' description='009-215-5596' />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <ContactCard icon='icofont-email' active={false} heading='Support mail' description='contact@example.com' />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="contact-map"><iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.3406974350205!2d90.48469931445422!3d23.663771197998262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b0d5983f048d%3A0x754f30c82bcad3cd!2sJalkuri%20Bus%20Stop!5e0!3m2!1sen!2sbd!4v1605354966349!5m2!1sen!2sbd" aria-hidden="false" tabIndex={0}></iframe></div>
                    </div>
                    <div className="col-lg-6">
                        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                            <h4>Drop Your Thoughts</h4>
                            <div className="form-group">
                                <div className="form-input-group"><input className="form-control" type="text" {...register('name')}
                                        placeholder="Your Name" /><i className="icofont-user-alt-3"></i></div>
                                        <ErrorMessage
                                            errors={errors}
                                            name='name'
                                            as={<div style={{ color: 'red' }} />}
                                        />
                            </div>
                            <div className="form-group">
                                <div className="form-input-group"><input className="form-control" type="text" {...register('email')}
                                        placeholder="Your Email" /><i className="icofont-email"></i></div>
                                        <ErrorMessage
                                            errors={errors}
                                            name='email'
                                            as={<div style={{ color: 'red' }} />}
                                        />
                            </div>
                            <div className="form-group">
                                <div className="form-input-group"><input className="form-control" type="text" {...register('phone')}
                                        placeholder="Your Phone" /><i className="icofont-phone"></i></div>
                                        <ErrorMessage
                                            errors={errors}
                                            name='phone'
                                            as={<div style={{ color: 'red' }} />}
                                        />
                            </div>
                            <div className="form-group">
                                <div className="form-input-group"><textarea className="form-control" {...register('message')}
                                        placeholder="Your Message"></textarea><i className="icofont-paragraph"></i></div>
                                        <ErrorMessage
                                            errors={errors}
                                            name='message'
                                            as={<div style={{ color: 'red' }} />}
                                        />
                            </div>
                            <button type="submit" className="form-btn-group" disabled={loading}>
                              {
                                loading ? <Spinner/> : <>
                                  <i className="fas fa-envelope"></i>
                                  <span>send message</span>
                                </>
                              }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    
    </>
  )
}
