import { api_routes } from "@/helper/routes";
import { BlogResponseType } from "@/helper/types";
import Link from "next/link";
import { useState } from "react";
import useSWR from 'swr'

const loadingArr = [1, 2, 3, 4]

export default function PopularBlogs() {
    const [page, setPage] = useState("1")
    const { data, isLoading } = useSWR<BlogResponseType>(api_routes.blog + `?total=6&page=${page}&filter[is_popular]=true`);

    return <div className="blog-widget">
        <h3 className="blog-widget-title">popular feeds</h3>
        <ul className="blog-widget-feed">
            {
                isLoading && loadingArr.map(i => <li key={i}>
                    <div className="blog-small-img-loading"></div>
                </li>)
            }
            {
                data?.data.map((item, i) => <li key={i}>
                    <Link className="blog-widget-media" href={`/blogs/${item.slug}`}
                    ><img src={item.image} alt="blog-widget"
                        /></Link>
                    <h6 className="blog-widget-text">
                        <Link href={`/blogs/${item.slug}`}>{item.name}</Link
                        ><span>{item.created_at}</span>
                    </h6>
                </li>)
            }
        </ul>
        { data?.meta.links && data?.meta.links[data?.meta.links.length - 1]?.url !== null && <div className="section-btn-25">
            <hr />
            <button className="btn btn-outline py-2 px-2" disabled={data?.meta.links && data?.meta.links[data?.meta.links.length - 1]?.url === null} onClick={() => (data?.meta.current_page && data.meta.per_page) && setPage((data?.meta.current_page + data.meta.per_page)?.toString())}><span>show more</span></button>
        </div>}
    </div>;
}