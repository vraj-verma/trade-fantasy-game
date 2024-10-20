import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { SignupDTO } from './dto/signup.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {

    constructor(
        @Inject('MYSQL_CONNECTION') private db: mysql.Connection,
        @Inject('RABBITMQ_SERVICE') private rabbitClient: ClientProxy
    ) { }

    async createUser(payload: SignupDTO): Promise<number> {
        try {
            const sqlQuerry = `INSERT INTO users(name, email, password, phone, country, userType) 
            VALUES(?, ?, ?, ?, ?, ?)`;
            const [response] = await this.db.query<ResultSetHeader>(sqlQuerry,
                [
                    payload.name,
                    payload.email,
                    payload.password,
                    payload.phone,
                    payload.country,
                    payload.usertype
                ]
            );

            payload.password = undefined;
            if (response) this.rabbitClient.emit('user_registered', payload);

            return response ? response.insertId : null;
        } catch (error) {
            console.error('Failed to create user ❌', error)
            throw new HttpException('Failed to create user, try again', HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async getByEmail(email: string) {
        try {
            const sqlQuery = `SELECT userId, name, email, password, status, userType FROM users
            WHERE email = ?`;
            const [response] = await this.db.query<RowDataPacket[]>(sqlQuery, email);

            return response && response.length > 0 ? response[0] : null;
        } catch (error) {
            console.error('Failed to fetch user by email ❌', error)
            throw new HttpException('Failed to fetch user by email', HttpStatus.NOT_IMPLEMENTED);
        }
    }


    async getByUserId(userId: number) {
        try {
            const sqlQuery = `SELECT userId, name, email, password, status FROM users
            WHERE userId = ?`;
            const [response] = await this.db.query<RowDataPacket[]>(sqlQuery, userId);

            return response && response.length > 0 ? response[0] : null;
        } catch (error) {
            console.error('Failed to fetch user by userId ❌', error)
            throw new HttpException('Failed to fetch user by userId', HttpStatus.NOT_IMPLEMENTED);
        }
    }

}
