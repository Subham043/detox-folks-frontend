import Head from 'next/head'
import Hero from '@/components/Hero';
import Link from 'next/link';


export default function Custom500() {

    return (
        <>
            <Head>
                <title>DetoxFolks - 500</title>
                <meta name="description" content='500' />
                <meta name="keywords" content='500' />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Hero name='500' />
            <section className="error-part mb-5 text-center">
                <div className="container">
                    <h1 className='mb-4'>500 | Server Error</h1>
                    <img className="img-fluid" src="/images/error.png" alt="error" />
                    <h3 className='mb-2'>Ooopps! something went wrong.</h3>
                    <p className='mb-2'>Please try after sometime.</p>
                    <Link href="/" className='btn btn-success py-2 px-2'>go to home</Link>
                </div>
            </section>
        </>
    )
}
