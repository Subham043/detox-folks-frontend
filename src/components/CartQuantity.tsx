import { useEffect, useState } from "react";
import Spinner from "./Spinner";

type CartQuantityType = {
    quantity:number;
    loading:boolean;
    incrementQuantity:()=>void;
    decrementQuantity:()=>void;
    changeQuantity:(val:number)=>void;
}

export default function CartQuantity({quantity, loading, incrementQuantity, decrementQuantity, changeQuantity}: CartQuantityType) {

    const [qnt, setQnt] = useState(quantity);
    useEffect(() => {
        setQnt(quantity);
      return () => {}
    }, [quantity])

    function debounce<Params extends any[]>(
        func: (...args: Params) => any,
        timeout: number,
      ): (...args: Params) => void {
        let timer: NodeJS.Timeout
        return (...args: Params) => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            func(...args)
          }, timeout)
        }
    }

    const debouncedQuatity = debounce(changeQuantity, 500);
    
    const handleChangeQuantity = (val: any) => {
        const data = parseInt(val);
        if(data<1 || isNaN(data)){
            setQnt(1);
            debouncedQuatity(1)
        }else{
            setQnt(data);
            debouncedQuatity(data)
        }
    }
    return <>
        {quantity===0 ? <button className="product-add" title="Add to Cart" disabled={loading} onClick={()=>incrementQuantity()}>
            {loading ? <Spinner/> : <><i className="fas fa-shopping-basket"></i><span>add</span></>}
        </button> :
        <div className={`product-action ${quantity!==0 ? 'd-flex':''}`}>
            <button className="action-minus" title="Quantity Minus" disabled={loading} onClick={()=>decrementQuantity()}>
                {loading ? <Spinner /> : <i className="icofont-minus"></i>}</button
            ><input
                className="action-input"
                title="Quantity Number"
                type="text"
                name="quantity"
                inputMode="numeric"
                disabled={loading}
                readOnly={loading}
                value={qnt}
                onChange={(e)=>handleChangeQuantity(e.target.value)}
            /><button className="action-plus" title="Quantity Plus" disabled={loading} onClick={()=>incrementQuantity()}>
                {loading ? <Spinner/> : <i className="icofont-plus"></i>}
            </button>
        </div>}
    </>
}