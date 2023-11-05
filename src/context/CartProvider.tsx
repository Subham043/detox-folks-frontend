import React, { createContext, useEffect, useState } from "react";
import { ChildrenType, CartType as CartDataType, CartChargeType, CartTaxType, CartCouponType } from "../helper/types";
import { api_routes } from "../helper/routes";
import { useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from 'swr'

export type CartType = {
    cart: CartDataType[];
    cart_charges: CartChargeType[];
    tax: CartTaxType;
    coupon_applied: CartCouponType|null;
    cart_subtotal: number;
    discount_price: number;
    total_charges: number;
    total_price: number;
    total_tax: number;
}
  
export type CartContextType = {
    cart: CartType;
    cartLoading: boolean;
    updateCart: (cartData: CartType) => void;
    fetchCart: () => void;
}

const cartDefaultValues: CartContextType = {
    cart: {
      cart:[],
      cart_charges:[],
      tax: {
        id:0,
        created_at: "",
        updated_at: "",
        tax_in_percentage: 0,
        tax_name: "",
        tax_slug: "",
      },
      coupon_applied: null,
      cart_subtotal: 0, 
      discount_price: 0, 
      total_charges: 0, 
      total_price: 0, 
      total_tax: 0
    },
    updateCart: (cartData: CartType) => {},
    fetchCart: () => {},
    cartLoading: false
};

export const CartContext = createContext<CartContextType>(cartDefaultValues);

const CartProvider: React.FC<ChildrenType> = ({children}) => {
    const [cart, setCartDetails] = useState<CartType>({
      cart:[], 
      cart_charges:[], 
      tax: {
        id:0,
        created_at: "",
        updated_at: "",
        tax_in_percentage: 0,
        tax_name: "",
        tax_slug: "",
      },
      coupon_applied: null,
      cart_subtotal:0, 
      discount_price: 0, 
      total_charges: 0, 
      total_price: 0, 
      total_tax: 0
    });
    const { status } = useSession();
    const { mutate } = useSWRConfig()

    const { data, isLoading:cartLoading } = useSWR<CartType>(status==='authenticated' ? api_routes.cart_all : null);

    useEffect(() => {
      if(status==='authenticated' && data){
        setCartDetails(data);
      }else{
        setCartDetails({
          cart:[], 
          cart_charges:[], 
          tax: {
            id:0,
            created_at: "",
            updated_at: "",
            tax_in_percentage: 0,
            tax_name: "",
            tax_slug: "",
          },
          coupon_applied: null,
          cart_subtotal:0, 
          discount_price: 0, 
          total_charges: 0, 
          total_price: 0, 
          total_tax: 0
        });
      }
      return () => {}
    }, [status, cartLoading])
    

    const updateCart = async (cartData: CartType) => {
      if(status==='authenticated'){
          setCartDetails(cartData);
      }
    }
    
    const fetchCart = async () => {
      mutate(api_routes.cart_all)
    }

    return (
      <CartContext.Provider value={{cart, updateCart, fetchCart, cartLoading}}>
          {children}
      </CartContext.Provider>
    );
}

export default CartProvider;