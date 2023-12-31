import Head from 'next/head'
import Hero from '@/components/Hero';
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { BlogResponseType } from "@/helper/types";
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import PopularBlogs from '@/components/PopularBlogs';
import BlogSocialWidget from '@/components/BlogSocialWidget';

const loadingArr = [1, 2, 3, 4]

export default function Blogs() {

  const [sort, setSort] = useState('-id')
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState("10")
  const [page, setPage] = useState("1")
  const { data, isLoading } = useSWR<BlogResponseType>(api_routes.blog + `?total=${total}&page=${page}&sort=${sort}&filter[search]=${search}`);

  return (
    <>
      <Head>
        <title>Parcelcounter</title>
        <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Hero name='Blogs' />

      <section className="inner-section blog-grid">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <div className="top-filter">
                    <div className="filter-show">
                      <label className="filter-label">Show :</label
                      ><select className="form-select filter-select" value={total} onChange={(e)=>setTotal(e.target.value)}>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                    <div className="filter-short">
                      <label className="filter-label">Sort by :</label
                      ><select className="form-select filter-select" value={sort} onChange={(e)=>setSort(e.target.value)}>
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
                  isLoading && loadingArr.map( i => <div className="col-md-6 col-lg-6" key={i}>
                  <div className="blog-img-loading"></div>
                  <div className="blog-heading-loading"></div>
                  <div className="blog-paragraph-loading"></div>
                </div>)
                }
                {
                  data?.data.map((item, i) => <div className="col-md-6 col-lg-6" key={i}>
                    <BlogCard {...item} />
                  </div>)
                }
              </div>
              <Pagination {...data?.meta} paginationHandler={setPage} />
            </div>
            <div className="col-md-7 col-lg-4">
              <div className="blog-widget">
                <h3 className="blog-widget-title">Find blogs</h3>
                <div className="blog-widget-form">
                  <input type="text" placeholder="Search blogs" value={search} onChange={(e)=>setSearch(e.target.value)} /><button
                    className="icofont-search-1"
                  ></button>
                </div>
              </div>
              <PopularBlogs />
              <BlogSocialWidget />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
