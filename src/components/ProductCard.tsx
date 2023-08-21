import { WishlistContext } from "@/context/WishlistProvider";
import { ProductType } from "@/helper/types";
import Link from "next/link";
import { useContext } from "react";

export default function ProductCard({ id, name, image, slug, created_at, description_unfiltered, product_prices }: ProductType) {

    const { wishlist, addItemWishlist, deleteItemWishlist, wishlistLoading } = useContext(WishlistContext);
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