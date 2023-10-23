import { CategoryType } from "@/helper/types";
import Link from "next/link";

export default function CategoryCard({ name, image, slug, sub_categories }: CategoryType) {

  return <div className="category-wrap">
    <div className="category-media">
      <img src={image} alt={name} />
      <div className="category-overlay">
        {
          sub_categories.length > 0 ?
            <Link href={`/category/${slug}`}>
              <i className="fas fa-link"></i>
            </Link> :
            <Link href={`/category/${slug}/product`}>
              <i className="fas fa-link"></i>
            </Link>
        }
      </div>
    </div>
    <div className="category-meta text-center">
      {
        sub_categories.length > 0 ?
          <Link href={`/category/${slug}`}>
            <h4>{name}</h4>
          </Link> :
          <Link href={`/category/${slug}/product`}>
            <h4>{name}</h4>
          </Link>
      }
    </div>
  </div>
}