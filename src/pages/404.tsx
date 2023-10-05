import Head from 'next/head'
import Hero from '@/components/Hero';
import Link from 'next/link';


export default function Custom404() {

    return (
        <>
            <Head>
                <title>DetoxFolks - 404</title>
                <meta name="description" content='404' />
                <meta name="keywords" content='404' />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Hero name='404' />
            <section className="error-part mb-5 text-center">
                <div className="container">
                    <h1 className='mb-4'>404 | Not Found</h1>
                    <img className="img-fluid" src="/images/error.png" alt="error" />
                    <h3 className='mb-2'>Ooopps! this page cant be found.</h3>
                    <p className='mb-2'>It looks like nothing was found at this location.</p>
                    <Link href="/" className='btn btn-success py-2 px-2'>Go to home</Link>
                </div>
            </section>
        </>
    )
}
