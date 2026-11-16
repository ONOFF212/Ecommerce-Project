
import { Entity, 
         Column, 
         JoinColumn,
         PrimaryGeneratedColumn ,
         CreateDateColumn,
         UpdateDateColumn,
         DeleteDateColumn,
         ManyToOne,
         OneToOne
} from "typeorm";
import "reflect-metadata";
import { Order } from "./order-entity.ts";
import { User } from "./user-entity.ts";

@Entity()
export class ShippingAddress{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar", length:10})
    phone:string;

    @Column({type:'varchar',length:255})
    country:string;

    @Column({type:'varchar',length:255})
    province:string;

    @Column({type:'varchar',length:255})
    municipality:string;

    @Column({type:'varchar',length:255})
    local:string;

    @Column({type:"varchar"})
    ward:string;

    @Column({type:'varchar',length:255})
    street:string;

    @ManyToOne(()=>User)
    @JoinColumn()
    user:User;

    @CreateDateColumn({select:false})
    createdAt: Date;

    @UpdateDateColumn({select:false})
    updatedAt : Date;

    @DeleteDateColumn({ nullable: true ,select:false })
    deletedAt : Date | null;
};