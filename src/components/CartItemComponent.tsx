import { FC } from "react";
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { useCart } from "@/hook/useCart";
import { CartType } from "@/helper/types";

const CartItemComponent: FC<CartType> = ({ id, product, product_price, amount }) => {

    const {quantity, cartLoading, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity, deleteItemCart} = useCart({id: product.id, product_prices: product.product_prices, min_cart_quantity: product.min_cart_quantity, cart_quantity_interval: product.cart_quantity_interval});

    return <li className="cart-item">
        <div className="cart-media">
            <a href="#"><img src={product.image} alt="product" /></a
            ><button className="cart-delete" disabled={cartItemLoading} onClick={() => deleteItemCart(id)}>
                {cartItemLoading ? <Spinner /> : <i className="far fa-trash-alt"></i>}
            </button>
        </div>
        <div className="cart-info-group">
            <div className="cart-info">
                <h6><Link href={`/products/${product.slug}`}>{product.name}</Link></h6>
                {
                    product_price && <p>
                        Unit Price - <span>&#8377;{product_price.discount_in_price}<small>/{product.cart_quantity_specification}</small></span>
                    </p>
                }
            </div>
            <div className="cart-action-group">
                <div className="product-action">
                    <button className="action-minus" title="Quantity Minus" disabled={cartItemLoading} onClick={() => decrementQuantity()}>
                        {cartItemLoading ? <Spinner /> : <i className="icofont-minus"></i>}
                    </button
                    ><input
                        className="action-input"
                        title="Quantity Number"
                        type="text"
                        name="quantity"
                        disabled={true}
                        readOnly={true}
                        value={quantity}
                    /><button className="action-plus" title="Quantity Plus" disabled={cartItemLoading} onClick={() => incrementQuantity()}>
                        {cartItemLoading ? <Spinner /> : <i className="icofont-plus"></i>}
                    </button>
                </div>
                <h6>&#8377;{amount}</h6>
            </div>
        </div>
    </li>
}

export default CartItemComponent;