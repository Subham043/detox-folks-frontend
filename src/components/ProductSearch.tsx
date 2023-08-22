import Link from "next/link";
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { ProductResponseType } from "@/helper/types";
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';

const loadingArr = [1, 2, 3, 4]

export default function ProductSearch() {
    const [page, setPage] = useState("1")
    const [search, setSearch] = useState("")
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=5&page=${page}&sort=-id&filter[search]=${search}`);

    return <form className="header-form flex-wrap">
        <div className="d-flex col-12">
            <input type="text" placeholder="Search anything..." value={search} onChange={(e) => setSearch(e.target.value)} /><button>
                <i className="fas fa-search"></i>
            </button>
        </div>
        {search.length!==0 && <div className="col-12 p-relative">
            {
                isLoading ? <div className="search-list-holder">
                    <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
                        {
                            loadingArr.map( i => <div className="col mb-2" key={i}>
                                <div className="blog-small-img-loading"></div>
                           </div>)
                        }
                    </div>
                </div> : <div className="search-list-holder">
                {
                    data?.data && data?.data.length>0 ? <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
                    {
                        data?.data.map((item, i) => <div className="col" key={i}>
                            <Link href={`/products/${item.slug}`} className="feature-card">
                                <div className="feature-media">
                                    <Link className="feature-image" href={`/products/${item.slug}`}
                                    ><img src={item.image} alt="product"
                                        /></Link>
                                </div>
                                <div className="feature-content">
                                    <h6 className="feature-name">
                                        <Link href={`/products/${item.slug}`}>{item.name}</Link>
                                    </h6>
                                    {
                                    item.product_prices.length>0 && <h6 className="feature-price m-0">
                                        {item.product_prices[item.product_prices.length-1].discount!==0 && <del>&#8377;{item.product_prices[item.product_prices.length-1].price}</del>}<span>&#8377;{item.product_prices[item.product_prices.length-1].discount_in_price}<small>/pieces</small></span>
                                        </h6>
                                    }
                                    <p className="feature-desc m-0 text-dark">
                                        {item.brief_description}
                                    </p>
                                </div>
                            </Link>
                        </div>)
                    }
                    </div> :
                    <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
                        <div className="col">
                            <p className="text-center">Oops! No data found.</p>
                        </div>
                    </div>
                }
                </div>
            }
        </div>}
    </form>
}