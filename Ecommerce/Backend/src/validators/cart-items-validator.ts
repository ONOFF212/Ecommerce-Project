
import * as yup from 'yup';

export const cartItemSchema = yup.object({
    quantity:yup.number().integer().min(1).default(1),
    product_id:yup.number().integer().required().nonNullable()
});

export type CartItems = yup.InferType<typeof cartItemSchema>;


export const cartItemUpdateSchema = yup.object({
    quantity:yup.number().integer().min(1).required(),
});

export type CartItemUpdate = yup.InferType<typeof cartItemUpdateSchema>;

export const addressSchema = yup.object({
    phone:yup.string().required().nonNullable(),
    ward:yup.string().optional(),
    country:yup.string().required().nonNullable(),
    province:yup.string().required().nonNullable(),
    municipality:yup.string().required().nonNullable(),
    local:yup.string().required().nonNullable(),
    street:yup.string().required().nonNullable(),
});

export type AddressInput = yup.InferType<typeof addressSchema>;