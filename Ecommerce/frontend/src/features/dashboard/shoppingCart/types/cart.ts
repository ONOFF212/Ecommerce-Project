
import {z} from 'zod'

export const createCartSchema = z.object({
    quantity:z.number().min(1),
    product_id:z.number().min(1).max(1),
});

export type CartInput = z.infer<typeof createCartSchema>;

export interface cartItemsDetails{
    id:number;
    product:{
        name:string;
        imgUrl:string;
        id:number;
        price:number;
        stock:number;
        category:{name:string};
    };
    quantity:number;
    price:number;
    cart:string;
}