import Head from 'next/head'
import Hero from '@/components/Hero';
import CategoryMain from '@/components/CategoryMain';

export default function Products() {

    return (
        <>
            <Head>
                <title>DetoxFolks</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Hero name='Categories' />
            <CategoryMain />
        </>
    )
}
