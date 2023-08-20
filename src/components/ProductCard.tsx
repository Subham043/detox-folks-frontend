import { ProductType } from "@/helper/types";
import Link from "next/link";

export default function ProductCard({ id, name, image, slug, created_at, description_unfiltered }: ProductType) {

  return <div className="col">
  <div className="product-card">
      <div className="product-media">
          <div className="product-label">
              <label className="label-text new">new</label>
          </div>
          <button className="product-wish wish">
              <i className="fas fa-heart"></i></button
          ><Link className="product-image text-center w-100" href={`/products/${slug}`}
          ><img src={image} alt="product"
              /></Link>
      </div>
      <div className="product-content">
          <h6 className="product-name">
              <Link href={`/products/${slug}`}>{name}</Link>
          </h6>
          <h6 className="product-price">
              <del>$34</del><span>$28<small>/piece</small></span>
          </h6>
          <button className="product-add" title="Add to Cart">
              <i className="fas fa-shopping-basket"></i><span>add</span>
          </button>
          <div className="product-action">
              <button className="action-minus" title="Quantity Minus">
                  <i className="icofont-minus"></i></button
              ><input
                  className="action-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  defaultValue="1"
              /><button className="action-plus" title="Quantity Plus">
                  <i className="icofont-plus"></i>
              </button>
          </div>
      </div>
  </div>
</div>
}