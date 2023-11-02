import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { ProductResponseType } from "@/helper/types";
import { useState } from "react";
import ProductSection from "./ProductSection";

export default function SpecialProducts({ title = "On Sale Products", filter = "is_on_sale", displayFilter = false, displayPagination = false, displayShowMoreBtn= false }: { title?: string, filter?: "is_on_sale" | "is_new" | "is_featured", displayFilter?: boolean, displayPagination?: boolean, displayShowMoreBtn?: boolean }) {
  const [sort, setSort] = useState('id')
  const [total, setTotal] = useState(displayFilter ? "36" : "12")
  const [page, setPage] = useState("1")
  const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=${total}&page=${page}&sort=${sort}&filter[${filter}]=true&filter[is_random]=true`);

  return <ProductSection 
    displayFilter={displayFilter} 
    displayHeading={true} 
    displayPagination={displayPagination} 
    displayShowMoreBtn={displayShowMoreBtn} 
    title={title} 
    total={total} 
    page={page}  
    sort={sort} 
    isLoading={isLoading} 
    filter={filter} 
    data={data} 
    setTotal={setTotal} 
    setPage={setPage} 
    setSort={setSort} 
  />;
}