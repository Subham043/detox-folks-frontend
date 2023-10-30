import Head from 'next/head'
import Hero from '@/components/Hero';
import useSWR from 'swr'
import { api_routes } from "@/helper/routes";
import { SubCategoryResponseType, CategoryType } from "@/helper/types";
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { axiosPublic } from '../../../../axios';
import SubCategoryCard from '@/components/SubCategoryCard';

const loadingArr = [1, 2, 3, 4, 5, 6]

type ServerSideProps = {
    category: CategoryType;
}

export const getServerSideProps: GetServerSideProps<{
    repo: ServerSideProps
}> = async (ctx: any) => {
    try {
        const categoryResponse = await axiosPublic.get(api_routes.categories + `/${ctx?.params.slug}`);
        return {
            props: {
                repo: {
                    category: categoryResponse.data.category,
                }
            }
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }

}

export default function Products({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [sort, setSort] = useState('id')
    const [total, setTotal] = useState("20")
    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<SubCategoryResponseType>(api_routes.sub_categories + `?total=${total}&page=${page}&sort=${sort}&filter[has_categories]=${repo.category.id}`);


    return (
        <>
            <Head>
                <title>Parcelcounter - {repo.category.name}</title>
                <meta name="description" content="Parcelcounter, headquartered in Bengaluru, is a leading manufacturer and wholesaler specializing in eco-friendly disposable food containers and kitchenware." />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="icon" href="/images/logo.png" />
            </Head>
            <Hero name='Categories' />

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
                                            <SubCategoryCard {...item} />
                                        </div> 
                                    )
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
