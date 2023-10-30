import Head from 'next/head'
import Hero from '@/components/Hero';
import CategoryMain from '@/components/CategoryMain';

export default function Products() {

    return (
        <>
            <Head>
                <title>Parcelcounter - Categories</title>
                <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Hero name='Categories' />
            <CategoryMain />
        </>
    )
}
