export interface orderDetails {
    id: number;
    shipping_address: {
        country: string;
        province: string;
        municipality: string;
        street: string;
    };
    quantity: number;
    order_date: string;
    status: string;
    total_amount: string;
}

export interface OrderResponse {
    message: string;
    order: orderDetails;
}

export interface orderDetail {
    id: number;
    order_items: {
        id: number;
        product: {
            id: number;
            name: string;
            description: string;
            imgUrl: string;
            category:{
                name:string;
            }
        };
        quantity: number;
        price: string;
    }[];
    shipping_address: {
        id: number;
        phone: string;
        country: string;
        province: string;
        municipality: string;
        street: string;
        local:string;
        ward:number;
    };
    quantity: number;
    order_date: string;
    order_time: string;
    status: string;
    total_amount: number;
}