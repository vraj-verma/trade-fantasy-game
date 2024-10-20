import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Utility {

    constructor(
        private jwtService: JwtService
    ) { }

    async encryptPassword(password: string) {
        try {
            const salt = await bcrypt.genSalt(7);
            const hash = bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            console.log(`Something went wrong while encrypting passwprd:`, error);
            return;
        }
    }

    async decryptPassword(compareTo: string, compareWith: string) {
        try {
            return await bcrypt.compare(compareTo, compareWith);
        } catch (error) {
            console.log(`Something went wrong while decrypting passwprd:`, error);
            return;
        }
    }

    async generateJWT(payload: any, option?: any) {
        try {
            return this.jwtService.sign(payload, option);
        } catch (error) {
            return null;
        }
    }

    async verifyJWT(token: string) {
        try {
            return await this.jwtService.verify(token);
        } catch (error) {
            return null;
        }
    }


    generateRandomId() {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return result;
    }

}