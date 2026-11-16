import { Context } from "koa";

import { checkOut, getOrderItems, getOrderItemsById, getOrderDetails, updateOrderStatus } from "../services/order-service.ts";

import { OrderParams, OrderStatusSchema } from "../validators/order-validator.ts";
import { OrderStatus } from "../entities/order-entity.ts";

export const createOrder = async(ctx:Context) => {

    const {user} = ctx.state;

    if(!user || !user.id) {
        ctx.status = 404;
        ctx.body= {message:"User Not found"};
        return;
    }

    const isOrder = await getOrderItems(user.id);
    if(isOrder != null || isOrder === undefined) {
        ctx.status = 400;
        ctx.body ={message:"Order Already made"}
        return;
    }

    await checkOut(user.id);
    ctx.status = 201;
    ctx.body = {
        message : "Order Created Successfully.....",
        checkOut
    }
};

export const viewOrderItems = async(ctx:Context) => {

    const {user} = ctx.state;

    const isViewOrder = await getOrderItems(user.id);
    if(!isViewOrder) {
        ctx.body = {message:"Failed to fetch order Details"};
        return;
    }
    ctx.status = 200;
    ctx.body = {
        message : "Order details Fetch done",
        order:isViewOrder
    }
};

export const viewOrderById = async(ctx:Context) => {
    const {user} = ctx.state;
    const validatedParams = await OrderParams.validate(ctx.params, {abortEarly:false});

    const isOrderItems = await getOrderItemsById(user.id, validatedParams.id);

    ctx.status = 200;
    ctx.body = {
        message : "Inside the single view routes ",
        order:isOrderItems
    }
};

export const adminViewOrder = async(ctx:Context) => {
    const isOrderDetails = await getOrderDetails();

    ctx.status = 200;
    ctx.body = {
        message : "Order Details",
        isOrderDetails
    }
};

export const adminUpdateOrder = async(ctx:Context) => {
    const validateParams = await OrderParams.validate(ctx.params, {abortEarly:false});
    const validatedStatus = await OrderStatusSchema.validate(ctx.request.body, {abortEarly:false});

    const isOrderUpdate = await updateOrderStatus(validateParams.id, validatedStatus.status as OrderStatus );

    if(isOrderUpdate.affected === 0) {
        ctx.status = 409;
        ctx.body= {message:"Failed to Update status...."}
        return;
    }

    ctx.status = 200;
    ctx.body = {
        message : "Updated Order status Succesfull",
        isOrderUpdate
    }
};