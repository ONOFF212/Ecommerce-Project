
import { Entity,
         PrimaryGeneratedColumn, 
         OneToOne, 
         JoinColumn,
         OneToMany,
         CreateDateColumn, 
         UpdateDateColumn, 
         DeleteDateColumn 
} from "typeorm";

import 'reflect-metadata';
import { User} from "./user-entity.ts";
import { CartItem } from "./cart-items-entity.ts";

@Entity()
export class Cart{

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(() => User)
    @JoinColumn()
    user:User;

    @OneToMany(() =>CartItem, (cartItem) => cartItem.cart)
    cartItems:CartItem[];
    
    @CreateDateColumn({select:false})
    createdAt: Date;

    @UpdateDateColumn({select:false})
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true ,select:false })
    deletedAt: Date | null;
};