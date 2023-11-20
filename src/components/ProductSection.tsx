import { ProductResponseType } from "@/helper/types";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8]

export default function ProductSection(
    {
        displayFilter=false, 
        displayHeading=false, 
        displayPagination=false, 
        displayShowMoreBtn=false, 
        title='', 
        total='', 
        page='', 
        sort='', 
        filter='is_on_sale', 
        isLoading=false,
        data=undefined,
        setTotal,
        setSort,
        setPage
    }:
    {
        displayFilter?:boolean, 
        displayHeading?:boolean, 
        displayPagination?:boolean, 
        displayShowMoreBtn?:boolean, 
        title:string, 
        total:string, 
        page:string, 
        sort:string, 
        filter?:"is_on_sale" | "is_new" | "is_featured", 
        isLoading:boolean, 
        data: ProductResponseType | undefined,
        setTotal?:Dispatch<SetStateAction<string>>,
        setSort?:Dispatch<SetStateAction<string>>,
        setPage?:Dispatch<SetStateAction<string>>
    }){
      const router = useRouter();

    return <section className="section feature-part">
    <div className="container">
      {
        displayHeading && 
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading"><h2>{title}</h2></div>
          </div>
        </div>
      }
      {
        displayFilter &&
        <div className="row">
            <div className="col-12 mb-3">
              <button className='btn btn-sm btn-warning' onClick={() => router.back()}>Go Back</button>
            </div>
            <div className="col-lg-12">
                <div className="top-filter">
                    <div className="filter-show">
                        <label className="filter-label">Show :</label
                        ><select className="form-select filter-select" value={total} onChange={(e) => setTotal && setTotal(e.target.value)}>
                          <option value="12">12</option>
                          <option value="36">36</option>
                          <option value="72">72</option>
                          <option value="108">108</option>
                        </select>
                    </div>
                    <div className="filter-short">
                        <label className="filter-label">Sort by :</label
                        ><select className="form-select filter-select" value={sort} onChange={(e) => setSort && setSort(e.target.value)}>
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
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 justify-content-center product-row">
        {
          !isLoading && data?.data.map((item, i) => <ProductCard key={i} {...item} />)
        }
      </div>
      {
          displayPagination && 
          <Pagination {...data?.meta} paginationHandler={setPage} />
      }
      {
          displayShowMoreBtn &&
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