import Head from 'next/head'
import Hero from '@/components/Hero';
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { ProductResponseType } from "@/helper/types";
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { useState } from 'react';

const loadingArr = [1, 2, 3, 4, 5, 6]

export default function Products() {
    const [sort, setSort] = useState('-id')
    const [total, setTotal] = useState("10")
    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=${total}&page=${page}&sort=${sort}`);

    return (
        <>
            <Head>
                <title>Detox-Folks</title>
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
                                <h6 className="shop-widget-title">Filter by Category</h6>
                                <form>
                                    <input
                                        className="shop-widget-search"
                                        type="text"
                                        placeholder="Search..."
                                    />
                                    <ul className="shop-widget-list shop-widget-scroll">
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate1" /><label htmlFor="cate1"
                                                >vegetables</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(13)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate2" /><label htmlFor="cate2"
                                                >groceries</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(28)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate3" /><label htmlFor="cate3"
                                                >fruits</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(35)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate4" /><label htmlFor="cate4"
                                                >dairy farm</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(47)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate5" /><label htmlFor="cate5"
                                                >sea foods</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(59)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate6" /><label htmlFor="cate6"
                                                >diet foods</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(64)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate7" /><label htmlFor="cate7"
                                                >dry foods</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(77)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate8" /><label htmlFor="cate8"
                                                >fast foods</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(85)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate9" /><label htmlFor="cate9"
                                                >drinks</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(92)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate10" /><label htmlFor="cate10"
                                                >coffee</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(21)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate11" /><label htmlFor="cate11"
                                                >meats</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(14)</span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate12" /><label htmlFor="cate12"
                                                >fishes</label
                                                >
                                            </div>
                                            <span className="shop-widget-number">(56)</span>
                                        </li>
                                    </ul>
                                    <button className="shop-widget-btn">
                                        <i className="far fa-trash-alt"></i><span>clear filter</span>
                                    </button>
                                </form>
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
