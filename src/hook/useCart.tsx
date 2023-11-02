import { CartContext } from "@/context/CartProvider";
import { ProductPriceType } from "@/helper/types";
import { useCallback, useContext, useEffect, useState } from "react";

export function useCart({
    id,
    product_prices,
    cart_quantity_interval,
    min_cart_quantity
}:{
    id: number,
    product_prices: ProductPriceType[],
    cart_quantity_interval: number,
    min_cart_quantity: number,
}){
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

    return {
        quantity,
        cartLoading,
        cart_product_item,
        incrementQuantity,
        changeQuantity,
        decrementQuantity,
    };
}