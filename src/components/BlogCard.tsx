import { BlogType } from "@/helper/types";
import Link from "next/link";

export default function BlogCard({ id, name, image, slug, created_at, description_unfiltered }: BlogType) {

  return <div className="blog-card">
    <div className="blog-media">
      <Link className="blog-img" href={`/blogs/${slug}`}
      ><img src={image} alt="blog"
        /></Link>
    </div>
    <div className="blog-content">
      <ul className="blog-meta">
        <li><i className="fas fa-user"></i><span>admin</span></li>
        <li>
          <i className="fas fa-calendar-alt"></i
          ><span>{created_at}</span>
        </li>
      </ul>
      <h4 className="blog-title">
        <Link href={`/blogs/${slug}`}
        >{name}
        </Link>
      </h4>
      <p className="blog-desc">
        {description_unfiltered}
      </p>
      <Link className="blog-btn" href={`/blogs/${slug}`}
      ><span>read more</span><i className="icofont-arrow-right"></i
      ></Link>
    </div>
  </div>
}