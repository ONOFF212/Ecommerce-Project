import { Context } from "koa";

import { checkOut, getOrderItems, getOrder,  getOrderItemsById, getOrderDetails, updateOrderStatus } from "../services/order-service.ts";

import { OrderParams, OrderStatusSchema } from "../validators/order-validator.ts";
import { OrderStatus } from "../entities/order-entity.ts";

export const createOrder = async(ctx:Context) => {

    const {user} = ctx.state;

    if(!user || !user.id) {
        ctx.status = 404;
        ctx.body= {message:"Failed"};
        return;
    }

    const isOrder = await getOrderItems(user.id);
    if(isOrder != null) {
        ctx.status = 400;
        ctx.body ={message:"Failed"}
        return;
    }

    await checkOut(user.id);
    ctx.status = 201;
    ctx.body = {
        message : "Success",
        checkOut
    }
};

export const viewOrderItems = async(ctx:Context) => {

    const {user} = ctx.state;

    const isViewOrder = await getOrder(user.id);
    if(!isViewOrder) {
        ctx.body = {message:"Failed"};
        return;
    }
    ctx.status = 200;
    ctx.body = {
        message : "Success",
        order:isViewOrder
    }
};

export const viewOrderById = async(ctx:Context) => {
    const {user} = ctx.state;
    const validatedParams = await OrderParams.validate(ctx.params, {abortEarly:false});

    const isOrderItems = await getOrderItemsById(user.id, validatedParams.id);

    ctx.status = 200;
    ctx.body = {
        message : "Success",
        order:isOrderItems
    }
};

export const adminViewOrder = async(ctx:Context) => {
    const isOrderDetails = await getOrderDetails();

    ctx.status = 200;
    ctx.body = {
        message : "Success",
        isOrderDetails
    }
};

export const adminUpdateOrder = async(ctx:Context) => {
    const validateParams = await OrderParams.validate(ctx.params, {abortEarly:false});
    const validatedStatus = await OrderStatusSchema.validate(ctx.request.body, {abortEarly:false});

    const isOrderUpdate = await updateOrderStatus(validateParams.id, validatedStatus.status as OrderStatus );

    if(isOrderUpdate.affected === 0) {
        ctx.status = 409;
        ctx.body= {message:"Failed"}
        return;
    }

    ctx.status = 200;
    ctx.body = {
        message : "Success",
        isOrderUpdate
    }
};