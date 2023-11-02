import { ProductType } from "@/helper/types";
import Link from "next/link";
import CartQuantity from "./CartQuantity";
import PriceFactor from "./PriceFactor";
import { useCart } from "@/hook/useCart";

export default function ProductCard2({ id, name, image, slug, product_prices, is_featured, min_cart_quantity, cart_quantity_interval, cart_quantity_specification }: ProductType) {

    const {quantity, cartLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id, product_prices, min_cart_quantity, cart_quantity_interval});

    return <div className="col">
    <div className="feature-card">
      <div className="feature-media">
        <div className="feature-label">
            {
                is_featured && <label className="label-text feat">feature</label>
            }
        </div>
        <Link className="feature-image text-center w-100" href={`/products/${slug}`}
            ><img src={image} alt="product"
         /></Link>
      </div>
      <div className="feature-content">
        <h6 className="feature-name">
          <Link href={`/products/${slug}`}>{name}</Link>
        </h6>
        <PriceFactor product_prices={product_prices} cart_quantity_specification={cart_quantity_specification} cart_product_item={cart_product_item} />
        <CartQuantity quantity={quantity} min_cart_quantity={min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartLoading} />
      </div>
    </div>
  </div>
}