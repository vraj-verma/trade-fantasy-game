import { USER_TYPE } from "../../enums/user-type.enum";

export class SignupDTO {
    userId: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    gamePlayed: number = 0;
    gameWon: number = 0;
    gameLost: number = 0;
    country: string = 'India';
    usertype?: USER_TYPE;
}