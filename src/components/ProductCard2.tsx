import { ProductType } from "@/helper/types";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import CartQuantity from "./CartQuantity";
import { CartContext } from "@/context/CartProvider";

export default function ProductCard2({ id, name, image, slug, product_prices, is_featured, is_new, is_on_sale, short_description, min_cart_quantity, cart_quantity_interval, cart_quantity_specification }: ProductType) {

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
        const priceArr = [...product_prices];
        const price_des_quantity = priceArr.sort(function(a, b){return b.min_quantity - a.min_quantity});
        const price = price_des_quantity.filter(item=>(quantity+cart_quantity_interval)>=item.min_quantity).length>0 ? price_des_quantity.filter(item=>(quantity+cart_quantity_interval)>=item.min_quantity)[0] : price_des_quantity[price_des_quantity.length-1];
        if(cart_product.length===0){
            addItemCart({
                product_id: id,
                product_price_id: price.id,
                quantity: min_cart_quantity,
                amount: (min_cart_quantity)*price.discount_in_price,
            })
        }else{
            updateItemCart({
                cartItemId: cart_product[0].id,
                product_id: id,
                product_price_id: price.id,
                quantity: quantity+cart_quantity_interval,
                amount: (quantity+cart_quantity_interval)*price.discount_in_price,
            })
        }
    };

    const changeQuantity = (value:number) => {
        const cart_product = cart_product_item();
        const priceArr = [...product_prices];
        const price_des_quantity = priceArr.sort(function(a, b){return b.min_quantity - a.min_quantity});
        const price = price_des_quantity.filter(item=>(value)>=item.min_quantity).length>0 ? price_des_quantity.filter(item=>(value)>=item.min_quantity)[0] : price_des_quantity[price_des_quantity.length-1];
        updateItemCart({
            cartItemId: cart_product[0].id,
            product_id: id,
            product_price_id: price.id,
            quantity: value,
            amount: (value)*price.discount_in_price,
        })
    };
    
    const decrementQuantity = () => {
        const cart_product = cart_product_item();
        const priceArr = [...product_prices];
        const price_des_quantity = priceArr.sort(function(a, b){return b.min_quantity - a.min_quantity});
        const price = price_des_quantity.filter(item=>(Math.max(0, quantity-cart_quantity_interval))>=item.min_quantity).length>0 ? price_des_quantity.filter(item=>(Math.max(0, quantity-cart_quantity_interval))>=item.min_quantity)[0] : price_des_quantity[price_des_quantity.length-1];
        if(cart_product.length!==0 && Math.max(0, quantity-cart_quantity_interval)!==0){
            updateItemCart({
                cartItemId: cart_product[0].id,
                product_id: id,
                product_price_id: price.id,
                quantity: Math.max(0, quantity-cart_quantity_interval),
                amount: (Math.max(0, quantity-cart_quantity_interval))*price.discount_in_price,
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
                            <code><i className='icofont-check'></i> Buy {item.min_quantity} {cart_quantity_specification} or more at &#8377;{item.discount_in_price}/{cart_quantity_specification}</code> : 
                            <code className='text-dark'><i className='icofont-info-circle'></i> Buy {item.min_quantity} {cart_quantity_specification} or more at &#8377;{item.discount_in_price}/{cart_quantity_specification}</code>
                        }
                    </li>)
                }
            </ul>
        </div>
    }

    const PriceFactor = () => {
        if(cart_product_item().length>0){
            return (<h6 className="feature-price">
                {cart_product_item()[0].product_price.discount !== 0 && <del>&#8377;{cart_product_item()[0].product_price.price}</del>}<span>&#8377;{cart_product_item()[0].product_price.discount_in_price}<small>/{cart_quantity_specification}</small></span>
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
            const priceArr = [...product_prices];
            const price = priceArr.sort(function(a, b){return a.discount_in_price - b.discount_in_price});
            return (<h6 className="feature-price">
                {price[0].discount !== 0 && <del>&#8377;{price[0].price}</del>}<span>&#8377;{price[0].discount_in_price}<small>/{cart_quantity_specification}</small></span>
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
        <PriceFactor />
        {/* <p className="feature-desc">
          {short_description}
        </p> */}
        <CartQuantity quantity={quantity} min_cart_quantity={min_cart_quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} changeQuantity={changeQuantity} loading={cartLoading} />
        {/* <button className="product-add" title="Add to Cart">
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
        </div> */}
      </div>
    </div>
  </div>
}