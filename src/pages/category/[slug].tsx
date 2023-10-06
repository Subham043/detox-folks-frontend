import Head from 'next/head'
import Hero from '@/components/Hero';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../../axios';
import { api_routes } from '@/helper/routes';
import { CategoryType, SubCategoryType } from '@/helper/types';
import Pagination from '@/components/Pagination';
import useSWR from 'swr'
import { ProductResponseType } from "@/helper/types";
import ProductCard from '@/components/ProductCard';
import { useEffect, useState } from 'react';

const loadingArr = [1, 2, 3, 4, 5, 6]

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
    const [sort, setSort] = useState('-id')
    const [total, setTotal] = useState("12")
    const [displayFilter, setDisplayFilter] = useState(false)
    const [page, setPage] = useState("1")
    const [filterSearch, setFilterSearch] = useState("")
    const [subCategory, setSubCategory] = useState("")
    const [subCategoryArr, setSubCategoryArr] = useState<string[]>([])
    const [mainSubCategoryArr, setMainSubCategoryArr] = useState<SubCategoryType[]>(repo.category.sub_categories)
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=${total}&page=${page}&sort=${sort}&filter[has_categories]=${repo.category.id}&filter[has_sub_categories]=${subCategory}`);
    
    const filterHandler = (data:EventTarget & HTMLInputElement) => {
        let arrData = [...subCategoryArr];
        if(data.checked){
            arrData = [...arrData, data.value]
        }else{
            arrData = arrData.filter(item => item!==data.value)
        }
        setSubCategoryArr([...arrData])
        const subCategoryStr = arrData.join('_');
        setSubCategory(subCategoryStr)
    }

    const clearFilterHandler = () => {
        setSubCategoryArr([])
        setSubCategory('')
    }

    const filterSearchHandler = (data:string) => {
        if(data.length>0){
            const filteredArr = repo.category.sub_categories.filter(item => item.name.toLowerCase().includes(data.toLowerCase()))
            setMainSubCategoryArr([...filteredArr])
        }else{
            setMainSubCategoryArr([...repo.category.sub_categories])
        }
        setFilterSearch(data);
    }

    return (
        <>
            <Head>
                <title>DetoxFolks - {repo.category.meta_title}</title>
                <meta name="description" content={repo.category.meta_description} />
                <meta name="keywords" content={repo.category.meta_keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Hero name={repo.category.name} />
            <section className="inner-section blog-details-part mb-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-xl-12">
                            <div className="blog-details-content row align-items-center">
                                <div className='col-xl-6 col-lg-6 col-sm-12'>
                                    <img src={repo.category.image} alt="blog" className='w-100'/>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-sm-12'>
                                    <h2 className="blog-details-title">
                                        {repo.category.heading}
                                    </h2>
                                    <div className="blog-details-desc" dangerouslySetInnerHTML={{ __html: repo.category.description }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="inner-section shop-part">
                <div className="container">
                    <div className="row content-reverse">
                        <div className="col-lg-3 d-none-md d-none-sm">
                            <div className="shop-widget">
                                <h6 className="shop-widget-title">Filter by Sub-Category</h6>
                                <div>
                                    <input
                                        className="shop-widget-search"
                                        type="text"
                                        placeholder="Search..."
                                        value={filterSearch}
                                        onChange={(e) => filterSearchHandler(e.target.value)}
                                    />
                                    <ul className="shop-widget-list shop-widget-scroll">
                                        {
                                            mainSubCategoryArr.map((item, i) => <li key={i}>
                                                <div className="shop-widget-content">
                                                    <input type="checkbox" id={`category${i + 1}`} value={item.id} checked={subCategoryArr.includes(item.id.toString())} onChange={(e) => filterHandler(e.target)} /><label htmlFor={`category${i + 1}`}
                                                    >{item.name}</label
                                                    >
                                                </div>
                                            </li>)
                                        }
                                    </ul>
                                    <button className="shop-widget-btn" onClick={clearFilterHandler}>
                                        <i className="far fa-trash-alt"></i><span>clear filter</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="top-filter">
                                        <div className="filter-show">
                                            <label className="filter-label">Show :</label
                                            ><select className="form-select filter-select" value={total} onChange={(e) => setTotal(e.target.value)}>
                                                <option value="12">12</option>
                                                <option value="36">36</option>
                                                <option value="72">72</option>
                                                <option value="108">108</option>
                                            </select>
                                        </div>
                                        <div className="filter-short">
                                            <label className="filter-label">Sort by :</label
                                            ><select className="form-select filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                                                <option value="-id">Latest</option>
                                                <option value="id">Oldest</option>
                                                <option value="name">A-Z</option>
                                                <option value="-name">Z-A</option>
                                            </select>
                                        </div>
                                    </div>
                                    {
                                            mainSubCategoryArr.length>0 && <>
                                                {displayFilter ? <div className="shop-widget mb-4 d-none-lg d-block-md d-block-sm">
                                                    <div className="row justify-content-between align-items-center mb-3 border-1" onClick={()=>setDisplayFilter(false)}>
                                                        <h6 className="shop-widget-title mb-0 pb-0 border-0 col-auto">Filter by Sub-Category</h6>
                                                        <i className="icofont-minus col-auto"></i>
                                                    </div>
                                                    <div>
                                                        <input
                                                            className="shop-widget-search"
                                                            type="text"
                                                            placeholder="Search..."
                                                            value={filterSearch}
                                                            onChange={(e) => filterSearchHandler(e.target.value)}
                                                        />
                                                        <ul className="shop-widget-list shop-widget-scroll">
                                                            {
                                                                mainSubCategoryArr.map((item, i) => <li key={i}>
                                                                    <div className="shop-widget-content">
                                                                        <input type="checkbox" id={`category${i + 1}`} value={item.id} checked={subCategoryArr.includes(item.id.toString())} onChange={(e) => filterHandler(e.target)} /><label htmlFor={`category${i + 1}`}
                                                                        >{item.name}</label
                                                                        >
                                                                    </div>
                                                                </li>)
                                                            }
                                                        </ul>
                                                        <button className="shop-widget-btn" onClick={clearFilterHandler}>
                                                            <i className="far fa-trash-alt"></i><span>clear filter</span>
                                                        </button>
                                                    </div>
                                                    </div> : <div className="shop-widget mb-4 d-none-lg d-block-md d-block-sm">
                                                    <div className="row justify-content-between align-items-center" onClick={()=>setDisplayFilter(true)}>
                                                        <h6 className="shop-widget-title border-0 mb-0 pb-0 col-auto">Filter by Sub-Category</h6>
                                                        <i className="icofont-plus col-auto"></i>
                                                    </div>
                                                </div>}
                                            </>
                                    }
                                    
                                </div>
                            </div>
                            <div className="row">
                                {
                                    isLoading && loadingArr.map(i => <div className="col-md-6 col-lg-4 col-sm-12 mb-4" key={i}>
                                        <div className="product-img-loading"></div>
                                    </div>)
                                }
                            </div>
                            <div
                                className="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3"
                            >
                                {
                                    data?.data.map((item, i) => <ProductCard key={i} {...item} />)
                                }
                            </div>
                            <Pagination {...data?.meta} paginationHandler={setPage} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
