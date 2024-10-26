
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { USER_TYPE } from '../enums/user-type.enum';

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phone: string;

    @Column()
    country: string;

    @Column()
    userType: USER_TYPE;

    @Column({ default: 0 })
    gamePlayed: number;

    @Column({ default: 0 })
    gameWon: number;

    @Column({ default: 0 })
    gameLost: number;

    @Column({ default: true })
    status: boolean;

    @Column({ default: null })
    sessionId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
