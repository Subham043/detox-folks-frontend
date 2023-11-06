import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { CategoryResponseType } from "@/helper/types";
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';

const loadingArr = [1, 2, 3, 4, 5, 6]

export default function CategoryMain({displayFilter=true}:{displayFilter?:boolean}) {
    const [sort, setSort] = useState('id')
    const [total, setTotal] = useState("20")
    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<CategoryResponseType>(api_routes.categories + `?total=${total}&page=${page}&sort=${sort}`);


    return <section className="inner-section shop-part">
        <div className="container">
            <div className="row">
                {!displayFilter && <div className="col-lg-12">
                    <div className="section-heading"><h2>Our Categories</h2></div>
                </div>}
                <div className="col-lg-12">
                    {
                        displayFilter &&
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="top-filter">
                                    <div className="filter-show">
                                        <label className="filter-label">Show :</label
                                        ><select className="form-select filter-select" value={total} onChange={(e) => setTotal(e.target.value)}>
                                            <option value="20">20</option>
                                            <option value="60">60</option>
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
                    }
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
                                    <CategoryCard {...item} />
                                </div> 
                            )
                        }
                    </div>
                    {
                        displayFilter ? 
                        <Pagination {...data?.meta} paginationHandler={setPage} /> : 
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-btn-25 mt-0">
                                    <Link href={`/category`} className="btn btn-outline"
                                    ><i className="fas fa-eye"></i><span>show more</span></Link
                                    >
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </section>
}
