import Link from "next/link";
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { ProductResponseType } from "@/helper/types";
import ProductCard from '@/components/ProductCard';
import { useState } from "react";
import Pagination from "./Pagination";

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8]

export default function SpecialProducts({ title = "On Sale Products", filter = "is_on_sale", displayFilter = false }: { title?: string, filter?: "is_on_sale" | "is_new" | "is_featured", displayFilter?: boolean }) {
  const [sort, setSort] = useState('id')
  const [total, setTotal] = useState("12")
  const [page, setPage] = useState("1")
  const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=${total}&page=${page}&sort=${sort}&filter[${filter}]=true&filter[is_random]=true`);

  return <section className="section feature-part">
    <div className="container">
      {
        !displayFilter && 
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading"><h2>{title}</h2></div>
          </div>
        </div>
      }
      {
        displayFilter &&
        <div className="row">
            <div className="col-lg-12">
                <div className="top-filter">
                    <div className="filter-show">
                        <label className="filter-label">Show :</label
                        ><select className="form-select filter-select" value={total} onChange={(e) => setTotal(e.target.value)}>
                            <option value="12">12</option>
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
      {isLoading && <div className="row">
        {
          loadingArr.map(i => <div className="col-sm-12 col-xl-3 col-lg-3 col-md-4 mb-2" key={i}>
            <div className="product-img-loading"></div>
          </div>)
        }
      </div>}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 justify-content-center">
        {
          !isLoading && data?.data.map((item, i) => <ProductCard key={i} {...item} />)
        }
      </div>
      {
          displayFilter ? 
          <Pagination {...data?.meta} paginationHandler={setPage} /> : 
          <div className="row">
            <div className="col-lg-12">
              <div className="section-btn-25">
                <Link href={`/special-products/${filter}`} className="btn btn-outline"
                ><i className="fas fa-eye"></i><span>show more</span></Link
                >
              </div>
            </div>
          </div>
      }
    </div>
  </section>;
}