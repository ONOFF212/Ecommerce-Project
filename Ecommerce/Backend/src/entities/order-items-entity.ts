
import 'reflect-metadata';
import { Entity,
         PrimaryGeneratedColumn, 
         Column, 
         CreateDateColumn, 
         UpdateDateColumn, 
         DeleteDateColumn, 
         ManyToOne,
         JoinColumn
} from 'typeorm';
import { Order } from './order-entity.ts';
import { Product } from './product-entity.ts';

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Order, (order) => order.order_items)
    @JoinColumn()
    order:Order

    @ManyToOne(()=>Product)
    @JoinColumn()
    product:Product

    @Column({type:"decimal", precision:12, scale:2})
    price:number;

    @Column({type:"int"})
    quantity:number;

    @CreateDateColumn({ select:false })
    createdAt: Date;

    @UpdateDateColumn({ select:false })
    updatedAt : Date;

    @DeleteDateColumn({ nullable: true ,select:false })
    deletedAt : Date | null;
}