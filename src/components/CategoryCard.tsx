import { CategoryType } from "@/helper/types";
import Link from "next/link";

export default function CategoryCard({ name, image, slug, sub_categories }: CategoryType) {

  return <Link href={sub_categories.length>0 ? `/category/${slug}` : `/category/${slug}/product`} className="category-wrap">
    <div className="category-media">
      <img src={image} alt={name} />
      <div className="category-overlay">
          <div className="category-icon-div">
            <i className="fas fa-link"></i>
          </div>
      </div>
    </div>
    <div className="category-meta text-center">
        <h4>{name}</h4>
    </div>
  </Link>
}