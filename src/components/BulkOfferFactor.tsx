import { CartType, ProductPriceType } from "@/helper/types";

export default function BulkOfferFactor(
    { 
        product_prices, 
        cart_quantity_specification,
        cart_product_item
    }: {
        product_prices: ProductPriceType[], 
        cart_quantity_specification: string,
        cart_product_item: () => CartType[]
    }) {

    return (product_prices && product_prices.length > 0) && <div className="orderlist-deliver mb-0 text-left">
        <p className='fs-7-note'>Note: Prices are inclusive of GST.</p>
        <h6 className='px-2'>Bulk Offer :</h6>
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
    </div>;
}