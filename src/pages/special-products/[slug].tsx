import Head from 'next/head'
import Hero from '@/components/Hero';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import SpecialProducts from '@/components/SpecialProducts';

type ServerSideProps = {
    data: {
        title: string;
        slug: "is_featured" | "is_new" | "is_on_sale" | undefined;
    };
}

export const getServerSideProps: GetServerSideProps<{
    repo: ServerSideProps
}> = async (ctx: any) => {
    switch (ctx?.params.slug) {
        case 'is_featured':
            return {
                props: {
                    repo: {
                        data: {
                            title: "Our Featured Products",
                            slug: "is_featured",
                        },
                    }
                }
            }
        case 'is_new':
            return {
                props: {
                    repo: {
                        data: {
                            title: "Our New Products",
                            slug: "is_new",
                        },
                    }
                }
            }
        case 'is_on_sale':
            return {
                props: {
                    repo: {
                        data: {
                            title: "On Sale Products",
                            slug: "is_on_sale",
                        },
                    }
                }
            }
    
        default:
            return {
                notFound: true,
            }
    }

}

export default function SpecialProductPage({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return <>
            <Head>
                <title>DetoxFolks - {repo.data.title}</title>
                <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
                <meta name="keywords" content={repo.data.title} />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Hero name={repo.data.title} />
            <SpecialProducts title={repo.data.title} filter={repo.data.slug} displayFilter={true} />
        </>;
}
