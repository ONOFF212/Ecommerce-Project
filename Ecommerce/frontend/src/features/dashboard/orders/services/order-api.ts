
import { ORDER_ITEMS_API } from "../constants/constants";
const orderGetApi = ORDER_ITEMS_API;

export async function getOrderItems(){
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${orderGetApi}`, {
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    if(!response.ok) {
        throw new Error("Failed to Fetch Order Details");
    }

    return await response.json();
};

export async function getOrderItemsById(id:number){
    const paramId = Number(id);
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${orderGetApi}/${paramId}`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
    if(!response.ok) {
        throw new Error("Failed to Fetch Order Details");
    }

    return await response.json();
};