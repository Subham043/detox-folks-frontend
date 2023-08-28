import Link from "next/link";
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { ProductResponseType } from "@/helper/types";
import ProductCard2 from "./ProductCard2";

const loadingArr = [1, 2, 3, 4, 5, 6]

export default function FeaturedProducts() {
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=6&page=1&sort=-id&filter[is_featured]=true`);

    return <section className="section feature-part">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading"><h2>our featured items</h2></div>
        </div>
      </div>
      {isLoading && <div className="row">
            {
                loadingArr.map( i => <div className="col-sm-12 col-lg-6 col-md-6 mb-2" key={i}>
                    <div className="blog-small-img-loading"></div>
            </div>)
            }
        </div>}
      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
        {
            !isLoading && data?.data.map((item, i)=><ProductCard2 key={i} {...item} />)
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