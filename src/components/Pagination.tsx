import { MetaType } from "@/helper/types";
import { Dispatch, SetStateAction } from "react";

export default function Pagination({current_page, from, last_page, per_page, to, total, path, links, paginationHandler}: MetaType & {paginationHandler?:Dispatch<SetStateAction<string>>}) {
    return <div className="row">
        <div className="col-lg-12">
            <div className="bottom-paginate justify-content-center">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" disabled={links && links[0]?.url===null} onClick={()=>(paginationHandler && current_page && per_page) && paginationHandler((current_page-per_page)?.toString())}
                        ><i className="fas fa-long-arrow-alt-left"></i
                        ></button>
                    </li>
                    {
                        links?.map((item, i) => (i!==0 && i!==links?.length-1) && <li className="page-item" key={i}>
                        <button className={`page-link ${item.active ? 'active':''}`} disabled={item.active} onClick={()=>paginationHandler && paginationHandler(item.label)}>{item.label}</button>
                    </li>)
                    }
                    {/* <li className="page-item">...</li> */}
                    <li className="page-item">
                        <button className="page-link" disabled={links && links[links.length-1]?.url===null} onClick={()=>(paginationHandler && current_page && per_page) && paginationHandler((current_page+per_page)?.toString())}
                        ><i className="fas fa-long-arrow-alt-right"></i
                        ></button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}