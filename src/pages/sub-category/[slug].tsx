import Head from 'next/head'
import Hero from '@/components/Hero';
import Link from 'next/link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosPublic } from '../../../axios';
import { api_routes } from '@/helper/routes';
import { CategoryType } from '@/helper/types';
import Pagination from '@/components/Pagination';
import useSWR from 'swr'
import { ProductResponseType } from "@/helper/types";
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8]

type ServerSideProps = {
    subCategory: CategoryType;
}

export const getServerSideProps: GetServerSideProps<{
    repo: ServerSideProps
}> = async (ctx: any) => {
    try {
        const subCategoryResponse = await axiosPublic.get(api_routes.sub_categories + `/${ctx?.params.slug}`);
        return {
            props: {
                repo: {
                    subCategory: subCategoryResponse.data.subCategory,
                }
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }

}


export default function SubCategory({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [sort, setSort] = useState('-id')
    const [total, setTotal] = useState("10")
    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<ProductResponseType>(api_routes.products + `?total=${total}&page=${page}&sort=${sort}&filter[has_sub_categories]=${repo.subCategory.id}`);
    return (
        <>
            <Head>
                <title>DetoxFolks - {repo.subCategory.meta_title}</title>
                <meta name="description" content={repo.subCategory.meta_description} />
                <meta name="keywords" content={repo.subCategory.meta_keywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/favicon.png" />
            </Head>
            <Hero name={repo.subCategory.name} />
            <section className="inner-section blog-details-part mb-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-xl-12">
                            <article className="blog-details">
                                <a className="blog-details-thumb w-100" href="#"
                                ><img src={repo.subCategory.image} alt="blog"
                                    /></a>
                                <div className="blog-details-content">
                                    <h2 className="blog-details-title">
                                        {repo.subCategory.heading}
                                    </h2>
                                    <div className="blog-details-desc" dangerouslySetInnerHTML={{ __html: repo.subCategory.description }} />
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
            <section className="inner-section shop-part">
                <div className="container">
                    <div className="row content-reverse">
                        <div className="col-lg-12">
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
                                    isLoading && loadingArr.map(i => <div className="col-md-6 col-lg-3 col-sm-12 mb-4" key={i}>
                                        <div className="product-img-loading"></div>
                                    </div>)
                                }
                            </div>
                            <div
                                className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4"
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
