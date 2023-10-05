import Head from 'next/head'
import Hero from '@/components/Hero';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../../axios';
import { api_routes } from '@/helper/routes';
import { LegalType } from '@/helper/types';

type ServerSideProps = {
    legal: LegalType;
}

export const getServerSideProps: GetServerSideProps<{
    repo: ServerSideProps
}> = async (ctx: any) => {
    try {
        const legalResponse = await axiosPublic.get(api_routes.legal + `/${ctx?.params.slug}`);
        return {
            props: {
                repo: {
                    legal: legalResponse.data.legal,
                }
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }

}

export default function ProductDetail({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <>
            <Head>
                <title>DetoxFolks - {repo.legal.meta_title}</title>
                <meta name="description" content={repo.legal.meta_description} />
                <meta name="keywords" content={repo.legal.meta_keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Hero name={repo.legal.heading} />
            <section className="inner-section privacy-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div
                                data-bs-spy="scroll"
                                data-bs-target="#scrollspy"
                                data-bs-offset="0"
                            >
                                <div className="scrollspy-content" id="item-1">
                                    <div dangerouslySetInnerHTML={{ __html: repo.legal.description }} />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
