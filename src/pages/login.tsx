import Head from 'next/head'
import LoginModal from '@/components/LoginModal';
import { getSession } from "next-auth/react"

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

export default function Login() {

  return (
    <>
        <Head>
            <title>Parcelcounter - Login</title>
            <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <link rel="icon" href="/images/logo.png" />
        </Head>
        <section className="user-form-part">
          <div className="container">
            <div className="row justify-content-center">
                  <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 mb-5">
                    <LoginModal />
                  </div>
            </div>
          </div>
        </section>
    </>
  )
}
