
import { Entity,
         PrimaryGeneratedColumn, 
         Column, 
         ManyToOne,
         CreateDateColumn, 
         UpdateDateColumn, 
         DeleteDateColumn, 
         JoinColumn
} from "typeorm";

import 'reflect-metadata';
import { Cart } from "./cart-entity.ts";
import { Product } from "./product-entity.ts";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Product)
    @JoinColumn({name:"product_id"})
    product:Product;

    @Column({ type : "int"})
    quantity:number;

    @Column( {type : "int"} )
    price:number;

    @ManyToOne(() => Cart, (cart)=> cart.cartItems)
    @JoinColumn()
    cart:Cart;

    @CreateDateColumn({select:false})
    createdAt:Date;

    @UpdateDateColumn({select:false})
    updatedAt:Date;

    @DeleteDateColumn({ nullable: true ,select:false })
    deletedAt:Date | null;
};