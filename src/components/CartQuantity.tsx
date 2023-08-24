type CartQuantityType = {
    quantity:number;
    loading:boolean;
    incrementQuantity:()=>void;
    decrementQuantity:()=>void;
}

export default function CartQuantity({quantity, loading, incrementQuantity, decrementQuantity}: CartQuantityType) {

    return <>
        {quantity===0 ? <button className="product-add" title="Add to Cart" disabled={loading} onClick={()=>incrementQuantity()}>
            <i className="fas fa-shopping-basket"></i><span>add</span>
        </button> :
        <div className={`product-action ${quantity!==0 ? 'd-flex':''}`}>
            <button className="action-minus" title="Quantity Minus" disabled={loading} onClick={()=>decrementQuantity()}>
                <i className="icofont-minus"></i></button
            ><input
                className="action-input"
                title="Quantity Number"
                type="text"
                name="quantity"
                readOnly={true}
                disabled={true}
                value={quantity}
            /><button className="action-plus" title="Quantity Plus" disabled={loading} onClick={()=>incrementQuantity()}>
                <i className="icofont-plus"></i>
            </button>
        </div>}
    </>
}