import Head from 'next/head'
import Hero from '@/components/Hero';
import ProfileCard from '@/components/ProfileCard';
import PasswordCard from '@/components/PasswordCard';
import BillingAddress from '@/components/BillingAddress';
import BillingInformation from '@/components/BillingInformation';
import { useSession } from "next-auth/react";
import { useState } from 'react';
import { ToastOptions, toast } from 'react-toastify';
import { axiosPublic } from '../../axios';
import { api_routes } from '@/helper/routes';
import { AxiosResponse } from "axios";
import Spinner from "../components/Spinner";

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

export default function Profile() {
  const { status, data: session, update: sessionUpdate } = useSession();
  const [showVerification, setShowVerification] = useState(true)
  const [loading, setLoading] = useState(false);

  const resendMail = async (data: any) => {
    setLoading(true);
    try {
      const response = await axiosPublic.post(api_routes.email_verify, {}, {
        headers: {"Authorization" : `Bearer ${session?.user.token}`}
      });
      toast.success(response.data.message, toastConfig); 
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message, toastConfig);
      }
    } finally {
      setLoading(false);
      sessionUpdate({
        verified: 'yes verified'
      })
    }
  };
  
  return (
    <>
      <Head>
        <title>DetoxFolks - Profile</title>
        <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Hero name='Profile' />

      <section className="inner-section profile-part">
        <div className="container">
          <div className="row">
            {
              (status==='authenticated' && session.user?.verified==="VERIFICATION PENDING" && showVerification) && 
              <div className="col-lg-12 mb-3">
                <div className="alert alert-warning mb-0 py-2" role="alert">
                    <div className="row justify-content-between">
                      <h4 className="alert-heading col-auto">Verification Pending!</h4>
                      <button type="button" className="btn-close col-auto" data-bs-dismiss="alert" aria-label="Close" onClick={()=> setShowVerification(false)}></button>
                    </div>
                    <p>Your email verification is still pending. Kindly verify your email by clicking on the link we had emailed to you? If you didn&apos;t receive the email, we will gladly send you another</p>
                    <hr />
                    <button className="btn btn-success btn-sm px-2 py-2" disabled={loading} onClick={resendMail}>
                           {
                            loading ? <Spinner/> : <>
                              Resend Verification Email
                            </>
                           }
                    </button>
                </div>
              </div>
            }
            <div className="col-lg-12">
              <ProfileCard />
            </div>
            <div className="col-lg-12">
              <PasswordCard />
            </div>
            <div className="col-lg-12">
              <BillingInformation />
            </div>
            <div className="col-lg-12">
              <BillingAddress />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
