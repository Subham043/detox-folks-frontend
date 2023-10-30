import Head from 'next/head'
import Hero from '@/components/Hero';
import CartComponent from '@/components/CartComponent';


export default function Cart() {
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
        </div>
      </section>

    </>
  )
}
