import React, { createContext, useEffect, useState } from "react";
import { ChildrenType, WishlistType as WishlistDataType } from "../helper/types";
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";
import { useSession } from "next-auth/react";

export type WishlistType = {
    wishlist: WishlistDataType[];
}
  
export type WishlistContextType = {
    wishlist: WishlistType;
    wishlistLoading: boolean;
    addItemWishlist: (data: number) => void;
    deleteItemWishlist: (data: number) => void;
}

const wishlistDefaultValues: WishlistContextType = {
    wishlist: {wishlist:[]},
    addItemWishlist: (data: number) => {},
    deleteItemWishlist: (data: number) => {},
    wishlistLoading: false
};

export const WishlistContext = createContext<WishlistContextType>(wishlistDefaultValues);

const WishlistProvider: React.FC<ChildrenType> = ({children}) => {
    const [wishlist, setWishlistDetails] = useState<WishlistType>({wishlist:[]});
    const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
    const { status, data: session } = useSession();
  
    useEffect(() => {
      getWishlist()
      return () => {}
    }, [status])
    

    const addItemWishlist = async (data: number) => {
        if(status==='authenticated'){
            setWishlistLoading(true);
            try {
              const response = await axiosPublic.post(api_routes.wishlist_create, {product_id:data}, {
                headers: {"Authorization" : `Bearer ${session?.user.token}`}
              });
              setWishlistDetails({wishlist: [...wishlist.wishlist, response.data.wishlist]});
            } catch (error: any) {
              console.log(error);
            }finally{
              setWishlistLoading(false);
            }
        }
    }
    
    const deleteItemWishlist = async (data: number) => {
        if(status==='authenticated'){
            setWishlistLoading(true);
            try {
              const response = await axiosPublic.delete(api_routes.wishlist_delete + `/${data}`, {
                headers: {"Authorization" : `Bearer ${session?.user.token}`}
              });
                const removedItemArray = wishlist.wishlist.filter(item => item.id !== data);
                setWishlistDetails({wishlist: [...removedItemArray]});
            } catch (error: any) {
              console.log(error);
            }finally{
              setWishlistLoading(false);
            }
        }
    }
    
    const getWishlist = async () => {
        if(status==='authenticated'){
            setWishlistLoading(true);
            try {
                const response = await axiosPublic.get(api_routes.wishlist_all, {
                    headers: {"Authorization" : `Bearer ${session?.user.token}`}
                });
                setWishlistDetails({wishlist: [...response.data.data]});
            } catch (error: any) {
              console.log(error);
            }finally{
              setWishlistLoading(false);
            }
        }
    }

    return (
      <WishlistContext.Provider value={{wishlist, addItemWishlist, deleteItemWishlist, wishlistLoading}}>
          {children}
      </WishlistContext.Provider>
    );
}

export default WishlistProvider;