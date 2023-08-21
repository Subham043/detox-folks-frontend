import { WishlistContext } from "@/context/WishlistProvider";
import { ProductType } from "@/helper/types";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartQuantity from "./CartQuantity";
import { CartContext } from "@/context/CartProvider";

export default function ProductCard({ id, name, image, slug, created_at, description_unfiltered, product_prices }: ProductType) {

    const { wishlist, addItemWishlist, deleteItemWishlist, wishlistLoading } = useContext(WishlistContext);
    const [quantity, setQuantity] = useState<number>(0);
    
    const { cart, addItemCart, updateItemCart, deleteItemCart, cartLoading } = useContext(CartContext);

    useEffect(() => {
      setQuantity(cart.cart.filter(item=>item.product.id===id).length===0 ? 0 : cart.cart.filter(item=>item.product.id===id)[0].quantity)
    
      return () => {}
    }, [cart.cart, id])

    const incrementQuantity = () => {
        const cart_product = cart.cart.filter(item=>item.product.id===id)
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
        const cart_product = cart.cart.filter(item=>item.product.id===id)
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

    return <div className="col">
        <div className="product-card">
            <div className="product-media">
                <div className="product-label">
                    <label className="label-text new">new</label>
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
                {
                    product_prices.length > 0 && <h6 className="product-price">
                        {product_prices[product_prices.length - 1].discount !== 0 && <del>&#8377;{product_prices[product_prices.length - 1].price}</del>}<span>&#8377;{product_prices[product_prices.length - 1].discount_in_price}<small>/pieces</small></span>
                    </h6>
                }
                <CartQuantity quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} loading={cartLoading} />
            </div>
        </div>
    </div>
}