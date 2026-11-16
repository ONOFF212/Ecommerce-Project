
import { AppDataSource } from "../db-config/db-config.ts";
import { Cart } from "../entities/cart-entity.ts";
import { CartItem } from "../entities/cart-items-entity.ts";
import { AddressInput, CartItems,CartItemUpdate } from "../validators/cart-items-validator.ts";
import { ShippingAddress } from "../entities/address-entity.ts";

const cartRepository = AppDataSource.getRepository(Cart);
const cartItemRepository = AppDataSource.getRepository(CartItem);
const shippingRepository = AppDataSource.getRepository(ShippingAddress);

export async function getCartItemById(id:number){
    return await cartItemRepository.findOne({
        where:{id},
    })
};

export async function createCart(user_id:number) {
    const cart =  cartRepository.create({
        user:{
            id:user_id,
        },
    })
    return await cartRepository.save(cart);
};

export async function findCartByUserId(id:number) {
    return await cartRepository.findOne({
        where:{
            user:{
                id
            }
        },
        relations:{
            user:true,
        },
        select:{
            id:true,
            user:true,
        }
    })
}

export async function saveCartItem({quantity, product_id} : CartItems, price:number, id:number){
    const saveCartItem = cartItemRepository.create({
        price,
        quantity,
        product:{
            id:product_id,
        },
        cart:{
            id
        }
    })
    return await cartItemRepository.save(saveCartItem);
}

export async function getCartItem(id:number){
    return await cartItemRepository.findAndCount({
        where:{
            cart:{
                id,
            }
        },
        relations:{
            product:{
                category:true,
            },
            cart:{
                user:true,
            },
        }
    });
};

export async function updateCartItem(id:number,user_id:number, quantity:number){
    const cartItem = await cartItemRepository.findOne({
        where:{
            id,
            cart:{user:{id:user_id}},
        }, relations:{cart:{user:true}},
    })

    if(!cartItem){
        throw new Error("Cart item not Found");
    }
    return await cartItemRepository.update( {id},{quantity});
};

export async function deleteCartItem(id:number, user_id:number){
    const cartItem = await cartItemRepository.findOne({
        where:{
            id,
            cart:{user:{id:user_id}},
        }, relations:{cart:{user:true}},
    })

    if(!cartItem){
        throw new Error("Cart item not Found");
    }
    return await cartItemRepository.softDelete({id});
};

export async function getAddress(id:number){
    return await shippingRepository.findOne({
        where:{
            user:{
                id,
            }
        },
    });
};

export async function saveAddress({phone, ward, country, province, municipality, local, street}:AddressInput, user_id:number){
    const isExisting = await cartRepository.findOne({
        where:{
            user:{id:user_id}
        },
    });

    if(isExisting?.deletedAt === null){
        throw new Error("Address Already Exist");
    }

    if(!isExisting){
        throw new Error('Address not found');
    }
    const saveAddressDetail = shippingRepository.create({
        phone,
        ward,
        country,
        province,
        municipality,
        local,
        street,
        user:{
            id:user_id,
        },
    })
    return await shippingRepository.save(saveAddressDetail);
};

export async function updateShippingAddress({phone, ward, country, province, municipality, local, street}:AddressInput, user_id:number){
    const existingAddress = await shippingRepository.findOne({
        where:{
            user:{
                id:user_id,
            },
        },relations:{
            user:true,
        }
    })

    if(!existingAddress){
        throw new Error('Address not found');
    }

    return await shippingRepository.update({user:{id:user_id}}, {phone, ward, province, municipality, local, street, country});

};

