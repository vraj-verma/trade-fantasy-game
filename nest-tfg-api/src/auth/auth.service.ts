import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../models/users.model';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Users) private db: Repository<Users>,
        @Inject('RABBITMQ_SERVICE') private rabbitClient: ClientProxy
    ) { }

    async createUser(payload: SignupDTO): Promise<number> {
        try {
            const sqlQuerry = `INSERT INTO users(name, email, password, phone, country, userType) 
            VALUES(?, ?, ?, ?, ?, ?)`;
            const response = await this.db.query(sqlQuerry,
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
            const sqlQuery = `SELECT userId, name, email, password, status, userType, sessionId FROM users
            WHERE email = ?`;
            const response = await this.db.query(sqlQuery, [email]);

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
            const response = await this.db.query(sqlQuery, [userId]);

            return response && response.length > 0 ? response[0] : null;
        } catch (error) {
            console.error('Failed to fetch user by userId ❌', error)
            throw new HttpException('Failed to fetch user by userId', HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async setSession(email: string, sessionId: string) {
        try {
            const sqlQuery = `UPDATE users SET sessionId = ? WHERE email = ?`;
            const response = await this.db.query(sqlQuery, [sessionId, email]);

            return response ? response : null;
        } catch (error) {
            console.error('Failed to update seesion ❌', error)
            throw new HttpException('Failed to update seesion', HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async removeSession(email: string) {
        try {
            const sqlQuerry = 'UPDATE users SET sessionId = null WHERE email = ?';

            const response = await this.db.query(sqlQuerry, [email]);

            return response ? response : null;
        } catch (error) {
            console.error('Failed to remove seesion ❌', error)
            throw new HttpException('Failed to remove seesion', HttpStatus.NOT_IMPLEMENTED);
        }
    }

}
