
import * as yup from "yup";

export const OrderSchema = yup.object({
    shipping_address:yup.string().required().nonNullable(),
});

export type orderCreate = yup.InferType<typeof OrderSchema>;

export const OrderParams = yup.object({
    id:yup.number().required().nonNullable(),
});

export type orderParams = yup.InferType<typeof OrderParams>;

export const OrderStatusSchema = yup.object({
    status:yup.string().required().nonNullable(),
});

export type orderStatus = yup.InferType<typeof OrderStatusSchema>;
