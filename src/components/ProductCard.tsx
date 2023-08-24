import { WishlistContext } from "@/context/WishlistProvider";
import { ProductType } from "@/helper/types";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import CartQuantity from "./CartQuantity";
import { CartContext } from "@/context/CartProvider";

export default function ProductCard({ id, name, image, slug, product_prices, is_featured, is_new, is_on_sale }: ProductType) {

    const { wishlist, addItemWishlist, deleteItemWishlist, wishlistLoading } = useContext(WishlistContext);
    const [quantity, setQuantity] = useState<number>(0);
    
    const { cart, addItemCart, updateItemCart, deleteItemCart, cartLoading } = useContext(CartContext);

    const cart_product_item = useCallback(
      () => cart.cart.filter(item=>item.product.id===id),
      [id, cart.cart],
    )

    useEffect(() => {
      setQuantity(cart_product_item().length===0 ? 0 : cart_product_item()[0].quantity)
    
      return () => {}
    }, [cart.cart, id])

    const incrementQuantity = () => {
        const cart_product = cart_product_item();
        const price = product_prices.filter(item=>(quantity+50)<=item.min_quantity).length>0 ? product_prices.filter(item=>(quantity+50)<=item.min_quantity)[0] : product_prices[product_prices.length-1];
        if(cart_product.length===0){
            addItemCart({
                product_id: id,
                product_price_id: price.id,
                quantity: quantity+50,
                amount: (quantity+50)*price.discount_in_price,
            })
        }else{
            updateItemCart({
                cartItemId: cart_product[0].id,
                product_id: id,
                product_price_id: price.id,
                quantity: quantity+50,
                amount: (quantity+50)*price.discount_in_price,
            })
        }
    };
    
    const decrementQuantity = () => {
        const cart_product = cart_product_item();
        const price = product_prices.filter(item=>(Math.max(0, quantity-50))<=item.min_quantity).length>0 ? product_prices.filter(item=>(Math.max(0, quantity-50))<=item.min_quantity)[0] : product_prices[product_prices.length-1];
        if(cart_product.length!==0 && Math.max(0, quantity-50)!==0){
            updateItemCart({
                cartItemId: cart_product[0].id,
                product_id: id,
                product_price_id: price.id,
                quantity: Math.max(0, quantity-50),
                amount: (Math.max(0, quantity-50))*price.discount_in_price,
            })
        }else{
            deleteItemCart(cart_product[0].id)
        }
    };

    const BulkOfferFactor = () => {
        return product_prices.length > 0 && <div className="orderlist-deliver mb-0 text-left">
            <h6 className='px-2 pt-1'>Bulk Offer :</h6>
            <hr className="my-1" />
            <ul className='pb-2'>
                {
                    product_prices.map((item, i) => <li className='px-2 pb-1' key={i}>
                        {
                            (cart_product_item().length>0 && item.min_quantity===cart_product_item()[0].product_price.min_quantity) ? 
                            <code><i className='icofont-check'></i> Buy {item.min_quantity} Pcs. or more at &#8377;{item.discount_in_price}/Pcs.</code> : 
                            <code className='text-dark'><i className='icofont-info-circle'></i> Buy {item.min_quantity} Pcs. or more at &#8377;{item.discount_in_price}/Pcs.</code>
                        }
                    </li>)
                }
            </ul>
        </div>
    }

    const PriceFactor = () => {
        if(cart_product_item().length>0){
            return (<h6 className="product-price">
                {cart_product_item()[0].product_price.discount !== 0 && <del>&#8377;{cart_product_item()[0].product_price.price}</del>}<span>&#8377;{cart_product_item()[0].product_price.discount_in_price}<small>/pieces</small></span>
                <div className="p-relative">
                    <ul className="navbar-list">
                        <li className="navbar-item dropdown product-dropdown">
                            <a className="" href="#">
                                <i className="icofont-info-circle mx-1"></i>
                            </a>
                            <ul className="dropdown-position-list product-dropdown-position-list">
                                <li><BulkOfferFactor/></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </h6>);
        }
        if(product_prices.length > 0){
            return (<h6 className="product-price">
                {product_prices[product_prices.length - 1].discount !== 0 && <del>&#8377;{product_prices[product_prices.length - 1].price}</del>}<span>&#8377;{product_prices[product_prices.length - 1].discount_in_price}<small>/pieces</small></span>
                <div className="p-relative">
                    <ul className="navbar-list">
                        <li className="navbar-item dropdown product-dropdown">
                            <a className="" href="#">
                                <i className="icofont-info-circle mx-1"></i>
                            </a>
                            <ul className="dropdown-position-list product-dropdown-position-list">
                                <li><BulkOfferFactor/></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </h6>);
        }
        return <></>;
    }

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
                <button disabled={wishlistLoading} className={`product-wish wish ${wishlist.wishlist.length>0 && wishlist.wishlist.filter(item=>item.product.id===id).length>0 ? 'active' : ''}`} onClick={()=> wishlist.wishlist.length>0 && wishlist.wishlist.filter(item=>item.product.id===id).length>0 ? deleteItemWishlist(wishlist.wishlist.filter(item=>item.product.id===id)[0].id) : addItemWishlist(id)}>
                    <i className="fas fa-heart"></i>
                </button>
                <Link className="product-image text-center w-100" href={`/products/${slug}`}
                ><img src={image} alt="product"
                    /></Link>
            </div>
            <div className="product-content">
                <h6 className="product-name">
                    <Link href={`/products/${slug}`}>{name}</Link>
                </h6>
                {/* {
                    cart_product_item().length>0 ? <h6 className="product-price">
                        {cart_product_item()[0].product_price.discount !== 0 && <del>&#8377;{cart_product_item()[0].product_price.price}</del>}<span>&#8377;{cart_product_item()[0].product_price.discount_in_price}<small>/pieces</small></span>
                    </h6>: product_prices.length > 0 && <h6 className="product-price">
                        {product_prices[product_prices.length - 1].discount !== 0 && <del>&#8377;{product_prices[product_prices.length - 1].price}</del>}<span>&#8377;{product_prices[product_prices.length - 1].discount_in_price}<small>/pieces</small></span>
                    </h6>
                } */}
                <PriceFactor />
                <CartQuantity quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} loading={cartLoading} />
            </div>
        </div>
    </div>
}