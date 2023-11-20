import Head from 'next/head'
import Hero from '@/components/Hero';
import CartComponent from '@/components/CartComponent';
import { useRouter } from "next/navigation";


export default function Cart() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Parcelcounter - Cart</title>
        <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Hero name='Cart' />

      <section className="inner-section checkout-part">
        <div className="container">
            <CartComponent is_page={true} />
            <div className="col-12 text-center mt-3">
              <button className='btn btn-sm btn-warning' onClick={() => router.back()}>Go Back</button>
            </div>
        </div>
      </section>

    </>
  )
}
