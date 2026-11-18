
import { CART_API_ROUTES, ADDRESS_API_ROUTES } from "../constants/constants";
import { CartInput } from "../types/cart";
import { addressInput } from "../types/address";
const Api = CART_API_ROUTES;
const addressAPI = ADDRESS_API_ROUTES;

export async function createCartItem(data:CartInput) {
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${Api}`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(data),
    });
    if(!response.ok){
        throw new Error("Failed to add Item to the Cart. Try again...");
    }
};

export async function getCartItem(){
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${Api}`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
    });

    if(!response.ok) {
        throw new Error("Failed to Fetch Cart Items");
    }

    return await response.json();
};

export async function updateCartItem(id:number, quantity:number){
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${Api}/${id}`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({quantity}),
    });
    if(!response.ok) {
        throw new Error("Failed to update item Quantity");
    }
    return await response.json();
};

export async function deleteCartItem(id:number){
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${Api}/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });
    if(!response.ok){
        throw new Error("Failed to Remove Cart Item");
    }

    return await response.json();
};

export async function createAddress(data:addressInput) {
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${addressAPI}`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(data),
    });
    if(!response.ok){
        throw new Error("Failed to add Item to the Cart. Try again...");
    }
    return await response.json();
};

export async function updateAddress(data:addressInput){

    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${addressAPI}`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(data),
    });
    if(!response.ok) {
        throw new Error("Failed to update item Quantity");
    }

    return;
};
