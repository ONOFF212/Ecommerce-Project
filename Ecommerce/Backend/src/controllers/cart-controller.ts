import { Context } from "koa";
import { cartItemSchema, CartItems, cartItemUpdateSchema, addressSchema, AddressInput } from "../validators/cart-items-validator.ts";
import { findProductById } from "../services/admin-products-service.ts";
import { findCartByUserId, getCartItem, saveCartItem, updateCartItem,deleteCartItem, getCartItemById, saveAddress, updateShippingAddress, getAddress } from "../services/cart-service.ts";


export const addItem = async(ctx:Context) => {
    const validatedCartItem : CartItems = await cartItemSchema.validate(ctx.request.body, {abortEarly:false});
    const {user} = ctx.state;

   const productId = await findProductById(validatedCartItem.product_id);
   
   if(productId?.id !== validatedCartItem.product_id ) {
        ctx.status = 404;
        ctx.body = {message:"Failed"}
        return;
   }

   const price = productId?.price; 

   const cartId = await findCartByUserId(user.id);
   if(!cartId) {
        ctx.status = 404;
        ctx.body = {message:"Failed"}
        return;
   }

   const cartItem = await saveCartItem({quantity:validatedCartItem.quantity,
                       product_id:validatedCartItem.product_id
                    } , 
                    price,
                    cartId.id,
    );

    if(!cartItem) {
        ctx.body = {
            message:"Failed"
        }
        return;
    }

    ctx.status = 200;
    ctx.body = {
        message:"Success"
    }
};

export const viewItems = async(ctx:Context) => {
    const {user} = ctx.state;

    const isUserCart = await  findCartByUserId(user.id);
    
    if(!isUserCart) {
        ctx.status = 404;
        ctx.body = {message:"Failed"}
        return;
    }
    const userCart = await getCartItem(isUserCart.id);
    const isAddress = await getAddress(user.id);
    if(!isAddress) {
        ctx.body = {message:"Address is Not Set...!"}
    }

    ctx.body = {
        message : "Success",
        cart:userCart[0],
        num:userCart[1],
        address:isAddress
    }
};

export const updateItem = async(ctx:Context) => {
    const {id} = ctx.params;
    const {user} = ctx.state;
    const itemId = Number(id);
    if(!Number.isInteger(itemId)){
        ctx.status=400;
        ctx.body = {message:"Invalid Cart Item ID"};
        return;
    }
    const validatedCartItem = await cartItemUpdateSchema.validate(ctx.request.body, {abortEarly:false});

    if(validatedCartItem.quantity === null) {
        return;
    }

    const cartUpdate = await updateCartItem(Number(itemId),user.id, validatedCartItem.quantity);

    if(cartUpdate.affected === 0){
        ctx.status = 404;
        ctx.body={message:"Cart Item Not Found"};
        return;
    }

    ctx.status = 200;
    ctx.body = {
        message : "Success",
    }
};

export const deleteItem = async(ctx:Context) => {
    const {user} = ctx.state;
    const {id} = ctx.params;

    const isUserCart = await findCartByUserId(user.id);

    const isItem = await getCartItemById(id);

    if (!isItem || !isUserCart){
        ctx.status = 404;
        ctx.body = { message:"Failed"};
        return;
    }

    await deleteCartItem(id, user.id);

    ctx.status = 200;
    ctx.body = {
        message : "Success"
    }
};

export const addAddress = async(ctx:Context) => {
    const validatedData : AddressInput = await addressSchema.validate(ctx.request.body, {abortEarly:false});
    const {user} = ctx.state; 

   const isAddress = await saveAddress(validatedData, user.id);

    if(!isAddress) {
        ctx.status = 400;
        ctx.body = {
            message:"Failed"
        }
        return;
    }

    ctx.status = 201;
    ctx.body = {
        message:"Success",
        data:isAddress
    }
};

export const updateAddress = async(ctx:Context) => {
    const {user} = ctx.state;

    const validatedData = await addressSchema.validate(ctx.request.body, {abortEarly:false});

    await updateShippingAddress(validatedData, user.id);

    ctx.status = 200;
    ctx.body = {
        message : "Success",
        data:updateShippingAddress
    }
};