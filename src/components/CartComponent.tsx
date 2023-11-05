import { CartContext } from "@/context/CartProvider";
import { FC, useContext } from "react";
import Link from 'next/link';
import CartItemComponent from "./CartItemComponent";

const CartComponent: FC<{ is_page?: boolean }> = ({ is_page = false }) => {
    const { cart } = useContext(CartContext);

    return <aside className={is_page ? '' : 'cart-sidebar'}>
        <div className="cart-header">
            <div className="cart-total">
                <i className="fas fa-shopping-basket"></i><span>total item ({cart.cart.length})</span>
            </div>
        </div>
        {cart.cart.length > 0 ? <ul className="cart-list">
            {
                cart.cart.map((item, i) => <CartItemComponent {...item} key={i} />)
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