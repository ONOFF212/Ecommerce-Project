
import { Entity,
         PrimaryGeneratedColumn, 
         Column, 
         CreateDateColumn, 
         UpdateDateColumn, 
         DeleteDateColumn, 
         ManyToOne,
         OneToMany,
         JoinColumn,
         OneToOne
} from "typeorm";

import "reflect-metadata";
import { User } from "./user-entity.ts";
import { OrderItem } from "./order-items-entity.ts";
import { ShippingAddress } from "./address-entity.ts";

export enum OrderStatus{
    PENDING="pending",
    PAID="paid",
    SHIPPED="shipped",
    DELIVERED="delivered",
    CANCELLED="cancelled"
};

@Entity()
export class Order{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User)
    @JoinColumn()
    user:User;

    @OneToMany(() => OrderItem, (orderitem) => orderitem.order)
    order_items: OrderItem[];

    @Column({type:"decimal", precision:12, scale:2})
    total_amount:number;

    @Column({type:"int"})
    quantity:number;

    @ManyToOne(() => ShippingAddress)
    @JoinColumn()
    shipping_address:ShippingAddress;

    @Column({type:"date", default:()=>'CURRENT_TIMESTAMP', utc:true})
    order_date: Date;

    @Column({type:'time', default:()=> 'CURRENT_TIMESTAMP', utc:true})
    order_time: string;

    @Column({type:"enum",
             enum:OrderStatus, 
             default:OrderStatus.PENDING
    })
    status: OrderStatus;

    @CreateDateColumn({ select:false })
    createdAt: Date;

    @UpdateDateColumn({ select:false })
    updatedAt : Date;

    @DeleteDateColumn({ nullable: true ,select:false })
    deletedAt : Date | null;
};