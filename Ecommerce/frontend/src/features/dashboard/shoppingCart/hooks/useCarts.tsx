
'use client'
import { useEffect, useState } from "react";
import { getCartItem } from "../services/cart-api";
import { cartItemsDetails } from "../types/cart";
import { addressInput } from "../types/address";

export function CartHooks(){
    const [cartItems, setCartItems] = useState<cartItemsDetails[]>([])
    const [subTotal, setSubTotal] = useState<number>(0);
    const[address, setAddress] = useState<addressInput>({province:"", municipality:"", local:"", street:"",phone:"", ward:"", country:""});
    const [num, setNum] = useState<number>();
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCart(){
            try{
                const result = await getCartItem();
                setCartItems(result.cart);
                const total = result.cart.reduce((sum:number, item:cartItemsDetails) => sum + item.price * item.quantity, 0);
                setSubTotal(total);
                setAddress(result.address);
                setNum(result.num);
            }catch(error){
                throw new Error(`Failed to Fetch Cart Items : ${error}`);
            }finally{
                setIsLoading(false);
            }
        };

        fetchCart();
    }, []);
    
    return {cartItems, num, subTotal, address, isLoading};
};