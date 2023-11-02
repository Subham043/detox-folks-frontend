import { ProductType } from "@/helper/types";
import Link from "next/link";
import CartQuantity from "./CartQuantity";
import PriceFactor from "./PriceFactor";
import {useCart} from "@/hook/useCart";

export default function ProductCard({ id, name, image, slug, product_prices, is_featured, is_new, is_on_sale, min_cart_quantity, cart_quantity_interval, cart_quantity_specification }: ProductType) {

    const {quantity, cartLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity} = useCart({id, product_prices, min_cart_quantity, cart_quantity_interval});

    return <div className="col">
        <div className="product-card">
            <div className="product-media">
                <div className="product-label">
                    {
                        is_new && <label className="details-label new">new</label>
                    }
                    {
                        is_featured && <label className="label-text feat">feature</label>
                    }
                    {
                        is_on_sale && <label className="label-text sale">sale</label>
                    }
                </div>
                <Link className="product-image text-center w-100" href={`/products/${slug}`}
                ><img src={image} alt="product"
                    /></Link>
            </div>
            <div className="product-content">
                <h6 className="product-name">
                    <Link href={`/products/${slug}`}>{name}</Link>
                </h6>
                <PriceFactor product_prices={product_prices} cart_quantity_specification={cart_quantity_specification} cart_product_item={cart_product_item} />
                <CartQuantity quantity={quantity} min_cart_quantity={min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartLoading} />
            </div>
        </div>
    </div>
}