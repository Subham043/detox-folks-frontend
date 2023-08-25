import Head from 'next/head'
import Hero from '@/components/Hero';
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { CategoryResponseType, CategoryType, ProductResponseType } from "@/helper/types";
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';

const loadingArr = [1, 2, 3, 4, 5, 6]

export default function Products() {
    const [sort, setSort] = useState('-id')
    const [total, setTotal] = useState("10")
    const [page, setPage] = useState("1")
    const [filterSearch, setFilterSearch] = useState("")
    const [subCategory, setSubCategory] = useState("")
    const [subCategoryArr, setSubCategoryArr] = useState<string[]>([])
    const [category, setCategory] = useState("")
    const [categoryArr, setCategoryArr] = useState<string[]>([])
    const { data:categoryData, isLoading: isCategoryLoading } = useSWR<CategoryResponseType>(api_routes.categories + '?total=1000');
    const [mainCategoryArr, setMainCategoryArr] = useState<CategoryType[] | undefined>(categoryData?.data)
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=${total}&page=${page}&sort=${sort}&filter[has_categories]=${category}&filter[has_sub_categories]=${subCategory}`);

    useEffect(() => {
        setMainCategoryArr(categoryData?.data)
    
      return () => {}
    }, [categoryData?.data])

    const filterCategoryHandler = (data:EventTarget & HTMLInputElement) => {
        let arrData = [...categoryArr];
        if(data.checked){
            arrData = [...arrData, data.value]
        }else{
            arrData = arrData.filter(item => item!==data.value)
        }
        setCategoryArr([...arrData])
        const categoryStr = arrData.join('_');
        setCategory(categoryStr)
    }
    
    const filterSubCategoryHandler = (data:EventTarget & HTMLInputElement) => {
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
        setCategoryArr([])
        setCategory('')
        setSubCategoryArr([])
        setSubCategory('')
    }
    

    const filterSearchHandler = (data:string) => {
        if(data.length>0){
            const filteredArr = categoryData?.data.filter((item) => {
                return item.name.toLowerCase().includes(data.toLowerCase()) || (item.sub_categories.filter(i => i.name.toLowerCase().includes(data.toLowerCase())).length>0 && true)
            })
            console.log(filteredArr);
            setMainCategoryArr(filteredArr)
        }else{
            setMainCategoryArr(categoryData?.data)
        }
        setFilterSearch(data);
    }

    return (
        <>
            <Head>
                <title>DetoxFolks</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Hero name='Products' />

            <section className="inner-section shop-part">
                <div className="container">
                    <div className="row content-reverse">
                        <div className="col-lg-3">
                            <div className="shop-widget">
                                <h6 className="shop-widget-title">Filter By Category</h6>
                                <div>
                                    <input
                                        className="shop-widget-search"
                                        type="text"
                                        placeholder="Search..."
                                        value={filterSearch}
                                        onChange={(e) => filterSearchHandler(e.target.value)}
                                    />
                                    {
                                        isCategoryLoading && loadingArr.map( i => <div className="blog-heading-loading" key={i}></div>)
                                    }
                                    <ul className="shop-widget-list shop-widget-scroll w-100">
                                        {
                                            mainCategoryArr?.map((item, i) => <li key={i}>
                                                <div className='w-100'>
                                                    <div className="shop-widget-content">
                                                        <input type="checkbox" id={`category${i + 1}`} value={item.id} checked={categoryArr.includes(item.id.toString())} onChange={(e) => filterCategoryHandler(e.target)} /><label htmlFor={`category${i + 1}`}
                                                        >{item.name}</label>
                                                    </div>
                                                    {item.sub_categories.length>0 && <ul className="shop-widget-list mx-4">
                                                        {
                                                            item.sub_categories?.map((itm, index) => <li key={index}>
                                                                <div className="shop-widget-content">
                                                                    <input type="checkbox" id={`sub_category${index + 1}`} value={itm.id} checked={subCategoryArr.includes(itm.id.toString())} onChange={(e) => filterSubCategoryHandler(e.target)} /><label htmlFor={`sub_category${index + 1}`}
                                                                    >{itm.name}</label
                                                                    >
                                                                </div>
                                                            </li>)
                                                        }
                                                    </ul>}
                                                    <hr />
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
                                                <option value="10">10</option>
                                                <option value="30">30</option>
                                                <option value="60">60</option>
                                                <option value="90">90</option>
                                                <option value="100">100</option>
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
                                className="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3"
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
