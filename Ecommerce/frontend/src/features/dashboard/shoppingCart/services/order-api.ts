
import { ORDER_API_ROUTES } from "../constants/constants";
const orderApi = ORDER_API_ROUTES;

export async function createOrder(){
    const token = localStorage.getItem("Bearer");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${orderApi}`, {
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });
    if(!response.ok){
        throw new Error("Failed to Make an Order");
    }

    return await response.json();
};
