
import {z} from 'zod'

export const createAddressSchema = z.object({
    phone:z.string().min(10 , "required").max(10, "required"),
    ward:z.string().optional(),
    country:z.string().nonempty(),
    province:z.string().nonempty({message:"Province must be include"}).max(25).toLowerCase(),
    municipality:z.string().nonempty({message:"Municipality must be include"}).max(25).toLowerCase(),
    local:z.string().nonempty({message:"local must be include"}).max(25).toLowerCase(),
    street:z.string().nonempty({message:"street must be include"}).max(25).toLowerCase(),
});

export type addressInput = z.infer<typeof createAddressSchema>;