
import { AppDataSource } from "../db-config/db-config.ts";
import { Cart } from "../entities/cart-entity.ts";
import { CartItem } from "../entities/cart-items-entity.ts";
import { Product } from "../entities/product-entity.ts";
import { Order, OrderStatus } from "../entities/order-entity.ts";
import { OrderItem } from "../entities/order-items-entity.ts";
import { ShippingAddress } from "../entities/address-entity.ts";
import { IsNull, Not } from "typeorm";

const orderRepository =  AppDataSource.getRepository(Order);

export async function checkOut(user_id:number){

    return await AppDataSource.transaction(async (manager) => {
        let total = 0;
        let total_quantity = 0;
        const cart = await manager.findOne(Cart, {
            where:{
                user:{id:user_id}
            },
            lock:{
                mode:"pessimistic_write",
            },
        });
        
        if(!cart){
            throw new Error("Cart Not Found...");
        }

        const cartWithItems = await manager.findOne(Cart, {
            where:{
                id:cart.id,
            }, relations:{
                cartItems:{
                    product:true,
                },
            },
        });

        if(!cartWithItems || !cartWithItems.cartItems.length){
            throw new Error("No Cart Item Found...");
        }

        for(const items of cartWithItems.cartItems) {
            if(!items.product) {
                throw new Error("Product Not Found");
            }
            if(!Number.isInteger(items.quantity) || items.quantity <= 0){
                throw new Error("Invalid Quantity");
            }

            if(!items.product || !Number.isInteger(items.product.price) || items.product.price <= 0) {
                throw new Error("Product Price is Invalid");
            }

            if(items.product.stock < items.quantity){
                throw new Error("Insufficient Stock Product");
            }
            total += items.product.price * items.quantity ;
            total_quantity += items.quantity;
        }

        const isAddress = await manager.findOne(ShippingAddress,{where:{user:{id:user_id}}}); 
        if(!isAddress){ console.log('inside CartWithItem isAddress'); throw new Error("Failed to load Address")};
        const order = manager.create(Order, {
            user:{
                id:user_id
            },
            total_amount:total,
            quantity:total_quantity,
            shipping_address:{id:isAddress.id},
            status:OrderStatus.PENDING
        });

        const saveOrder  = await manager.save(Order, order);

        for (const item of cartWithItems.cartItems){
            const findProduct = await manager.findOne(Product, {
                where:{
                    id:item.product.id,
                },
                lock:{
                    mode:"pessimistic_write",
                },
            });

            if(!findProduct || findProduct.stock < item.quantity) {
                throw new Error("Insufficient Stock");
            }

            const orderItem = manager.create(OrderItem, {
                order:saveOrder,
                product:item.product,
                price:item.product.price,
                quantity:item.quantity
            });
            await manager.save(OrderItem, orderItem);
            findProduct.stock -= item.quantity;
            await manager.save(Product, findProduct);
        }

        await manager.softDelete(CartItem, {
            cart:{
                id:cart.id,
            }
        });

        return saveOrder;
    });
};

export async function getOrderItems(user_id:number){
    return await orderRepository.findOne({
        where:{
            user:{
                id:user_id,
            },
        },
        relations:{
            shipping_address:true,
        },
        select:{
            id:true,
            quantity:true,
            order_items:true,
            shipping_address:true,
            order_date:true,
            status:true,
            total_amount:true,
        },
    })
};

export async function getOrder(user_id:number){
    return await orderRepository.findOne({
        withDeleted : true,
        where:{
            user:{
                id:user_id,
            },
        },
        relations:{
            shipping_address:true,
        },
        select:{
            id:true,
            quantity:true,
            order_items:true,
            shipping_address:true,
            order_date:true,
            status:true,
            total_amount:true,
        },
    })
};

export async function getOrderItemsById(user_id:number, id:number) {
    return await orderRepository.find({
        withDeleted : true,
        where:{
            id,
            user:{
                id:user_id,
            },
        },
        relations:{
            order_items:{
                product:{
                    category:true,
                },
            },
            shipping_address:true,
        },  
    });
};

export async function getOrderDetails(){
    return await orderRepository.find({
        relations:{
            order_items:true,
            user:true,
        }
    });
};

export async function updateOrderStatus(id:number, state:OrderStatus) {
    return await orderRepository.update(
        {id},
        {
          status:state
        }
    );
};