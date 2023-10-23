import Link from "next/link";
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { ProductResponseType } from "@/helper/types";
import ProductCard from '@/components/ProductCard';

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8]

export default function SpecialProducts({title="On Sale Products", filter="is_on_sale"}:{title?:string, filter?:"is_on_sale"|"is_new"|"is_featured"}) {
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=12&page=1&sort=-id&filter[${filter}]=true&filter[is_random]=true`);

    return <section className="section feature-part">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading"><h2>{title}</h2></div>
        </div>
      </div>
      {isLoading && <div className="row">
            {
                loadingArr.map( i => <div className="col-sm-12 col-xl-3 col-lg-3 col-md-4 mb-2" key={i}>
                    <div className="product-img-loading"></div>
            </div>)
            }
        </div>}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
        {
            !isLoading && data?.data.map((item, i)=><ProductCard key={i} {...item} />)
        }
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="section-btn-25">
            <Link href="/products" className="btn btn-outline"
              ><i className="fas fa-eye"></i><span>show more</span></Link
            >
          </div>
        </div>
      </div>
    </div>
  </section>;
}