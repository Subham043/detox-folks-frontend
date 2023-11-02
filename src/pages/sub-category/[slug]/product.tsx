import Head from 'next/head'
import Hero from '@/components/Hero';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../../../axios';
import { api_routes } from '@/helper/routes';
import { CategoryType } from '@/helper/types';
import useSWR from 'swr'
import { ProductResponseType } from "@/helper/types";
import { useState } from 'react';
import ProductSection from '@/components/ProductSection';

type ServerSideProps = {
    subCategory: CategoryType;
}

export const getServerSideProps: GetServerSideProps<{
    repo: ServerSideProps
}> = async (ctx: any) => {
    try {
        const subCategoryResponse = await axiosPublic.get(api_routes.sub_categories + `/${ctx?.params.slug}`);
        return {
            props: {
                repo: {
                    subCategory: subCategoryResponse.data.subCategory,
                }
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }

}


export default function SubCategory({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [sort, setSort] = useState('name')
    const [total, setTotal] = useState("12")
    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=${total}&page=${page}&sort=${sort}&filter[has_sub_categories]=${repo.subCategory.id}`);
    return (
        <>
            <Head>
                <title>DetoxFolks - {repo.subCategory.name}</title>
                <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
                <meta name="keywords" content={repo.subCategory.meta_keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Hero name={repo.subCategory.name} />
            <ProductSection 
                displayFilter={true} 
                displayPagination={true} 
                title=''
                total={total} 
                page={page}  
                sort={sort} 
                isLoading={isLoading}
                data={data} 
                setTotal={setTotal} 
                setPage={setPage} 
                setSort={setSort} 
            />
        </>
    )
}
