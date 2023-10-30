import { CartContext } from "@/context/CartProvider";
import { FC, useContext } from "react";
import { CartType } from '@/helper/types';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

const CartComponent: FC<{ is_page?: boolean }> = ({ is_page = false }) => {
    const { cart, updateItemCart, deleteItemCart, cartLoading } = useContext(CartContext);

    const incrementQuantity = (item: CartType) => {
        const priceArr = [...item.product.product_prices];
        const price_des_quantity = priceArr.sort(function (a, b) { return b.min_quantity - a.min_quantity });
        const price = price_des_quantity.filter(i => (item.quantity + item.product.cart_quantity_interval) >= i.min_quantity).length > 0 ? price_des_quantity.filter(i => (item.quantity + item.product.cart_quantity_interval) >= i.min_quantity)[0] : price_des_quantity[price_des_quantity.length - 1];
        updateItemCart({
            cartItemId: item.id,
            product_id: item.product.id,
            product_price_id: price.id,
            quantity: item.quantity + item.product.cart_quantity_interval,
            amount: (item.quantity + item.product.cart_quantity_interval) * price.discount_in_price,
        })
    };

    const decrementQuantity = (item: CartType) => {
        const priceArr = [...item.product.product_prices];
        const price_des_quantity = priceArr.sort(function (a, b) { return b.min_quantity - a.min_quantity });
        const price = price_des_quantity.filter(i => (Math.max(0, item.quantity - item.product.cart_quantity_interval)) >= i.min_quantity).length > 0 ? price_des_quantity.filter(i => (Math.max(0, item.quantity - item.product.cart_quantity_interval)) >= i.min_quantity)[0] : price_des_quantity[price_des_quantity.length - 1];
        if (Math.max(0, item.quantity - item.product.cart_quantity_interval) !== 0) {
            updateItemCart({
                cartItemId: item.id,
                product_id: item.product.id,
                product_price_id: price.id,
                quantity: Math.max(0, item.quantity - item.product.cart_quantity_interval),
                amount: (Math.max(0, item.quantity - item.product.cart_quantity_interval)) * price.discount_in_price,
            })
        } else {
            deleteItemCart(item.id)
        }
    };

    return <aside className={is_page ? '' : 'cart-sidebar'}>
        <div className="cart-header">
            <div className="cart-total">
                <i className="fas fa-shopping-basket"></i><span>total item ({cart.cart.length})</span>
            </div>
        </div>
        {cart.cart.length > 0 ? <ul className="cart-list">
            {
                cart.cart.map((item, i) => <li className="cart-item" key={i}>
                    <div className="cart-media">
                        <a href="#"><img src={item.product.image} alt="product" /></a
                        ><button className="cart-delete" disabled={cartLoading} onClick={() => deleteItemCart(item.id)}>
                            {cartLoading ? <Spinner /> : <i className="far fa-trash-alt"></i>}
                        </button>
                    </div>
                    <div className="cart-info-group">
                        <div className="cart-info">
                            <h6><Link href={`/products/${item.product.slug}`}>{item.product.name}</Link></h6>
                            {
                                item.product_price && <p>
                                    Unit Price - <span>&#8377;{item.product_price.discount_in_price}<small>/pieces</small></span>
                                </p>
                            }
                        </div>
                        <div className="cart-action-group">
                            <div className="product-action">
                                <button className="action-minus" title="Quantity Minus" disabled={cartLoading} onClick={() => decrementQuantity(item)}>
                                    {cartLoading ? <Spinner /> : <i className="icofont-minus"></i>}
                                </button
                                ><input
                                    className="action-input"
                                    title="Quantity Number"
                                    type="text"
                                    name="quantity"
                                    disabled={true}
                                    readOnly={true}
                                    value={item.quantity}
                                /><button className="action-plus" title="Quantity Plus" disabled={cartLoading} onClick={() => incrementQuantity(item)}>
                                    {cartLoading ? <Spinner /> : <i className="icofont-plus"></i>}
                                </button>
                            </div>
                            <h6>&#8377;{item.amount}</h6>
                        </div>
                    </div>
                </li>)
            }
        </ul> : <ul className="cart-list">
            <li className="cart-item">
                <p className='text-center'>No items are there in cart. Kindly add one!</p>
            </li>
        </ul>}
        {cart.cart.length > 0 && <div className="cart-footer">
            <Link className="cart-checkout-btn" href="/checkout"
            ><span className="checkout-label">Proceed to Checkout</span
            ><span className="checkout-price">&#8377;{cart.cart_subtotal}</span></Link
            >
        </div>}
    </aside>
}

export default CartComponent