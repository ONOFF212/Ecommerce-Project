
'use client'
import { useEffect, useState } from "react";
import { OrderResponse } from "../types/order";
import { getOrderItems } from "../services/order-api";

export function OrderHooks(){
    const [isOrder, setIsOrder] = useState<OrderResponse | null>(null);

    useEffect(() => {
        async function fetchOrder() {
            try{
                const result = await getOrderItems();
                setIsOrder(result);
            }catch(error){
                throw new Error(`Failed to Fetch Order ${error}`);
            }
        };
        fetchOrder();
    }, []);

    return {isOrder};
};