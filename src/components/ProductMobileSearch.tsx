import Link from "next/link";
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { ProductResponseType } from "@/helper/types";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

const loadingArr = [1, 2, 3, 4]

export default function ProductMobileSearch() {
    const router = useRouter();
    const [search, setSearch] = useState("")
    const [showList, setShowList] = useState(true)
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=100&page=1&sort=-id&filter[search]=${search}`);
    useEffect(() => {
        setShowList(false)
    }, [router]);

    return <form className="d-none-lg header-form flex-wrap d-flex-sm">
        <div className="header-form-holder flex-wrap col-12">
            <input type="text" placeholder="Search anything..." className="col-11" value={search} onChange={(e) => {setSearch(e.target.value);setShowList(true)}} /><button className="col-1">
                <i className="fas fa-search"></i>
            </button>
        </div>
        <div className={`col-12 p-relative search-list-main`}>
            {(search.length!==0 && showList) && <div className={`col-12 p-relative`}>
                {
                    <div className="search-list-holder">
                    {
                        data?.data && data?.data.length>0 && <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 search-list-height">
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
                                            {item.short_description}
                                        </p>
                                    </div>
                                </Link>
                            </div>)
                        }
                        </div>
                    }
                    {(!isLoading && data?.data.length===0) && <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
                        <div className="col">
                            <p className="text-center">Oops! No data found.</p>
                        </div>
                    </div>}
                    {isLoading && <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
                        {
                            loadingArr.map( i => <div className="col mb-2" key={i}>
                                <div className="blog-small-img-loading"></div>
                        </div>)
                        }
                    </div>}
                    </div>
                }
            </div>}
        </div>
    </form>
}