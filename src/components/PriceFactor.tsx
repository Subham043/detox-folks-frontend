import { CartType, ProductPriceType } from "@/helper/types";
import BulkOfferFactor from "./BulkOfferFactor";

export default function PriceFactor(
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
            return (<h6 className="product-price">
                {cart_product_item()[0].product_price.discount !== 0 && <del>&#8377;{cart_product_item()[0].product_price.price}</del>}<span>&#8377;{cart_product_item()[0].product_price.discount_in_price}<small>/{cart_quantity_specification}</small></span>
                <div className="p-relative">
                    <ul className="navbar-list">
                        <li className="navbar-item dropdown product-dropdown">
                            <a className="" href="#">
                                <i className="icofont-info-circle mx-1"></i>
                            </a>
                            <ul className="dropdown-position-list product-dropdown-position-list">
                                <li><BulkOfferFactor product_prices={product_prices} cart_quantity_specification={cart_quantity_specification} cart_product_item={cart_product_item} /></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </h6>);
        }
        if(product_prices.length > 0){
            const priceArr = [...product_prices];
            const price = priceArr.sort(function(a, b){return a.discount_in_price - b.discount_in_price});
            return (<h6 className="product-price">
                {price[0].discount !== 0 && <del>&#8377;{price[0].price}</del>}<span>&#8377;{price[0].discount_in_price}<small>/{cart_quantity_specification}</small></span>
                <div className="p-relative">
                    <ul className="navbar-list">
                        <li className="navbar-item dropdown product-dropdown">
                            <a className="" href="#">
                                <i className="icofont-info-circle mx-1"></i>
                            </a>
                            <ul className="dropdown-position-list product-dropdown-position-list">
                                <li><BulkOfferFactor product_prices={product_prices} cart_quantity_specification={cart_quantity_specification} cart_product_item={cart_product_item}/></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </h6>);
        }
        return <></>;
}