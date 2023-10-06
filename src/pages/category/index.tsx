import Head from 'next/head'
import Hero from '@/components/Hero';
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { CategoryResponseType } from "@/helper/types";
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import Link from 'next/link';

const loadingArr = [1, 2, 3, 4, 5, 6]

export default function Products() {
    const [sort, setSort] = useState('-id')
    const [total, setTotal] = useState("10")
    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<CategoryResponseType>(api_routes.categories + `?total=${total}&page=${page}&sort=${sort}`);


    return (
        <>
            <Head>
                <title>DetoxFolks</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Hero name='Categories' />

            <section className="inner-section shop-part">
                <div className="container">
                    <div className="row content-reverse">
                        <div className="col-lg-12">
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
                                    isLoading && loadingArr.map(i => <div className="col-md-6 col-lg-2 col-sm-12 mb-4" key={i}>
                                        <div className="product-img-loading" style={{height:'150px'}}></div>
                                    </div>)
                                }
                            </div>
                            <div
                                className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center mb-4"
                            >
                                {
                                    data?.data.map((item, i) => <div className="col mb-4" key={i}>
                                            <div className="category-wrap">
                                                <div className="category-media">
                                                    <img src={item.image} alt={item.name} />
                                                    <div className="category-overlay">
                                                        <Link href={`/category/${item.slug}`}>
                                                            <i className="fas fa-link"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="category-meta text-center">
                                                    <Link href={`/category/${item.slug}`}>
                                                        <h4>{item.name}</h4>
                                                    </Link>
                                                </div> 
                                            </div> 
                                        </div> 
                                        )
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
