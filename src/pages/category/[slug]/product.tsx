import Head from 'next/head'
import Hero from '@/components/Hero';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../../../axios';
import { api_routes } from '@/helper/routes';
import { CategoryType, SubCategoryType } from '@/helper/types';
import useSWR from 'swr'
import { ProductResponseType } from "@/helper/types";
import { useState } from 'react';
import ProductSection from '@/components/ProductSection';

type ServerSideProps = {
    category: CategoryType;
}

export const getServerSideProps: GetServerSideProps<{
    repo: ServerSideProps
}> = async (ctx: any) => {
    try {
        const categoryResponse = await axiosPublic.get(api_routes.categories + `/${ctx?.params.slug}`);
        return {
            props: {
                repo: {
                    category: categoryResponse.data.category,
                }
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }

}


export default function Category({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [sort, setSort] = useState('name')
    const [total, setTotal] = useState("12")
    // const [displayFilter, setDisplayFilter] = useState(false)
    const [page, setPage] = useState("1")
    // const [filterSearch, setFilterSearch] = useState("")
    // const [subCategory, setSubCategory] = useState("")
    // const [subCategoryArr, setSubCategoryArr] = useState<string[]>([])
    // const [mainSubCategoryArr, setMainSubCategoryArr] = useState<SubCategoryType[]>(repo.category.sub_categories)
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=${total}&page=${page}&sort=${sort}&filter[has_categories]=${repo.category.id}`);
    
    // const filterHandler = (data:EventTarget & HTMLInputElement) => {
    //     let arrData = [...subCategoryArr];
    //     if(data.checked){
    //         arrData = [...arrData, data.value]
    //     }else{
    //         arrData = arrData.filter(item => item!==data.value)
    //     }
    //     setSubCategoryArr([...arrData])
    //     const subCategoryStr = arrData.join('_');
    //     setSubCategory(subCategoryStr)
    // }

    // const clearFilterHandler = () => {
    //     setSubCategoryArr([])
    //     setSubCategory('')
    // }

    // const filterSearchHandler = (data:string) => {
    //     if(data.length>0){
    //         const filteredArr = repo.category.sub_categories.filter(item => item.name.toLowerCase().includes(data.toLowerCase()))
    //         setMainSubCategoryArr([...filteredArr])
    //     }else{
    //         setMainSubCategoryArr([...repo.category.sub_categories])
    //     }
    //     setFilterSearch(data);
    // }

    return (
        <>
            <Head>
                <title>DetoxFolks - {repo.category.name}</title>
                <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
                <meta name="keywords" content={repo.category.meta_keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Hero name={repo.category.name} />

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
