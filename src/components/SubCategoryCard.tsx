import { SubCategoryType } from "@/helper/types";
import Link from "next/link";

export default function SubCategoryCard({ name, image, slug }: SubCategoryType) {

  return <div className="category-wrap">
    <div className="category-media">
      <img src={image} alt={name} />
      <div className="category-overlay">
        <Link href={`/sub-category/${slug}`}>
          <i className="fas fa-link"></i>
        </Link>
      </div>
    </div>
    <div className="category-meta text-center">
      <Link href={`/sub-category/${slug}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </div>
}