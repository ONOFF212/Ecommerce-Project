
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar'})
    name:string;

    @CreateDateColumn({ select:false })
    createdAt: Date;

    @UpdateDateColumn({ select:false })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true ,select:false })
    deletedAt: Date | null;
};