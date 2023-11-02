import { CartType, ProductPriceType } from "@/helper/types";

export default function PriceFactor2(
    { 
        product_prices, 
        cart_quantity_specification,
        cart_product_item
    }: {
        product_prices: ProductPriceType[], 
        cart_quantity_specification: string,
        cart_product_item: () => CartType[]
    }) {
        if(cart_product_item().length>0){
            return (<h3 className="details-price">
                {cart_product_item()[0].product_price.discount !== 0 && <del>&#8377;{cart_product_item()[0].product_price.price}</del>}<span>&#8377;{cart_product_item()[0].product_price.discount_in_price}<small>/{cart_quantity_specification}</small></span>
            </h3>);
        }
        if(product_prices.length > 0){
            const priceArr = [...product_prices];
            const price = priceArr.sort(function(a, b){return a.discount_in_price - b.discount_in_price});
            return (<h3 className="details-price">
                {price[0].discount !== 0 && <del>&#8377;{price[0].price}</del>}<span>&#8377;{price[0].discount_in_price}<small>/{cart_quantity_specification}</small></span>
            </h3>);
        }
        return <></>;
}