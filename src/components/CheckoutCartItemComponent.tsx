import { FC } from "react";
import Link from 'next/link';
import { useCart } from "@/hook/useCart";
import { CartType } from "@/helper/types";
import Spinner from "./Spinner";

const CheckoutCartItemComponent: FC<CartType & {index: number}> = ({ id, product, product_price, amount, index }) => {

    const {quantity, cartLoading, cartItemLoading, cart_product_item, incrementQuantity, changeQuantity, decrementQuantity, deleteItemCart} = useCart({id: product.id, product_prices: product.product_prices, min_cart_quantity: product.min_cart_quantity, cart_quantity_interval: product.cart_quantity_interval});

    return <tr>
        <td className="table-serial"><h6>{index+1}</h6></td>
        <td className="table-image">
        <img src={product.image} alt="product" />
        </td>
        <td className="table-name"><h6>{product.name}</h6></td>
        <td className="table-price">
        {
            product_price && <h6>
                <span>&#8377;{product_price.discount_in_price}<small>/{product.cart_quantity_specification}</small></span>
            </h6>
        }
        </td>
        {/* <td className="table-quantity"><h6>{quantity}</h6></td> */}
        <td className="table-quantity">
            <div className="cart-action-group">
                <div className="product-action w-100">
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
            </div>
        </td>
        <td className="table-brand"><h6>&#8377;{amount}</h6></td>
        <td className="table-action">
        <Link
            className="view"
            href={`/products/${product.slug}`}
            title="Quick View"
            data-bs-toggle="modal"
            data-bs-target="#product-view"
        ><i className="fas fa-eye"></i></Link
        ><button className="trash" title="Remove Cart Item" disabled={cartItemLoading} onClick={()=>deleteItemCart(id)}
        ><i className="icofont-trash"></i
        ></button>
        </td>
    </tr>
}

export default CheckoutCartItemComponent;