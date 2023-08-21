import React, { createContext, useEffect, useState } from "react";
import { ChildrenType, CartType as CartDataType } from "../helper/types";
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";
import { useSession } from "next-auth/react";
import { ToastOptions, toast } from 'react-toastify';

const toastConfig:ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export type CartType = {
    cart: CartDataType[];
}

type CartInput = {
  product_id: number;
  product_price_id: number;
  quantity: number;
  amount: number;
}
  
export type CartContextType = {
    cart: CartType;
    cartLoading: boolean;
    addItemCart: (data: CartInput) => void;
    updateItemCart: ({cartItemId, ...data}: CartInput & {cartItemId:number}) => void;
    deleteItemCart: (data: number) => void;
}

const cartDefaultValues: CartContextType = {
    cart: {cart:[]},
    addItemCart: (data: CartInput) => {},
    updateItemCart: ({cartItemId, ...data}: CartInput & {cartItemId:number}) => {},
    deleteItemCart: (data: number) => {},
    cartLoading: false
};

export const CartContext = createContext<CartContextType>(cartDefaultValues);

const CartProvider: React.FC<ChildrenType> = ({children}) => {
    const [cart, setCartDetails] = useState<CartType>({cart:[]});
    const [cartLoading, setCartLoading] = useState<boolean>(false);
    const { status, data: session } = useSession();
  
    useEffect(() => {
      getCart()
      return () => {}
    }, [status])
    

    const addItemCart = async (data: CartInput) => {
        if(status==='authenticated'){
            setCartLoading(true);
            try {
              const response = await axiosPublic.post(api_routes.cart_create, data, {
                headers: {"Authorization" : `Bearer ${session?.user.token}`}
              });
              setCartDetails({cart: [...cart.cart, response.data.cart]});
              toast.success("Item added to cart.", toastConfig);
            } catch (error: any) {
              console.log(error);
              toast.error("Something went wrong. Please try again later!", toastConfig);
            }finally{
              setCartLoading(false);
            }
        }else{
            toast.error("Please log in to add the item to cart.", toastConfig);
        }
    }
    
    const updateItemCart = async ({cartItemId, ...data}: CartInput & {cartItemId:number}) => {
        if(status==='authenticated'){
            setCartLoading(true);
            try {
              const response = await axiosPublic.post(api_routes.cart_update + `/${cartItemId}`, data, {
                headers: {"Authorization" : `Bearer ${session?.user.token}`}
              });
              const remove_cart_product = cart.cart.filter(item=>item.id!==cartItemId);
              setCartDetails({cart: [...remove_cart_product, response.data.cart]});
              toast.success("Item quantity updated in cart.", toastConfig);
            } catch (error: any) {
              console.log(error);
              toast.error("Something went wrong. Please try again later!", toastConfig);
            }finally{
              setCartLoading(false);
            }
        }else{
            toast.error("Please log in to add the item to cart.", toastConfig);
        }
    }
    
    const deleteItemCart = async (data: number) => {
        if(status==='authenticated'){
            setCartLoading(true);
            try {
              const response = await axiosPublic.delete(api_routes.cart_delete + `/${data}`, {
                headers: {"Authorization" : `Bearer ${session?.user.token}`}
              });
                const removedItemArray = cart.cart.filter(item => item.id !== data);
                setCartDetails({cart: [...removedItemArray]});
                toast.success("Item removed from cart.", toastConfig);
            } catch (error: any) {
              console.log(error);
              toast.error("Something went wrong. Please try again later!", toastConfig);
            }finally{
              setCartLoading(false);
            }
        }else{
            toast.error("Please log in to remove the item from cart.", toastConfig);
        }
    }
    
    const getCart = async () => {
        if(status==='authenticated'){
            setCartLoading(true);
            try {
                const response = await axiosPublic.get(api_routes.cart_all, {
                    headers: {"Authorization" : `Bearer ${session?.user.token}`}
                });
                setCartDetails({cart: [...response.data.data]});
            } catch (error: any) {
              console.log(error);
            }finally{
              setCartLoading(false);
            }
        }
    }

    return (
      <CartContext.Provider value={{cart, addItemCart, updateItemCart, deleteItemCart, cartLoading}}>
          {children}
      </CartContext.Provider>
    );
}

export default CartProvider;