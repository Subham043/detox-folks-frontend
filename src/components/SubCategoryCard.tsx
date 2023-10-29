import { SubCategoryType } from "@/helper/types";
import Link from "next/link";

export default function SubCategoryCard({ name, image, slug }: SubCategoryType) {

  return <Link href={`/sub-category/${slug}/product`} className="category-wrap">
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