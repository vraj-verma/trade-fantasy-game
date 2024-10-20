import {
    Injectable,
    HttpStatus,
    HttpException,
} from "@nestjs/common";
import { Request } from "express";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth/auth.service";
import { USER_TYPE } from "../enums/user-type.enum";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([
                    ExtractJwt.fromAuthHeaderAsBearerToken(),
                    ExtractJwt.fromUrlQueryParameter('token'),
                ]),
                ignoreExpiration: false,
                secretOrKey: 'test-secreteeeeee',
                passReqToCallback: true,
            }
        );
    }

    async validate(req: Request, payload: any) {

        const email = payload.email;

        const user = await this.authService.getByEmail(email);

        if (!user) {
            throw new HttpException(
                `Please login and get JWT token`,
                HttpStatus.UNAUTHORIZED
            );
        }

        console.log(user,'8**********')

        if(user.userType !== USER_TYPE.COMMENTATOR){
            throw new HttpException(
                `Player can not add game data`,
                HttpStatus.FORBIDDEN
            );
        }

        if (user.status !== 1) {
            throw new HttpException(
                `Your account is not Active.`,
                HttpStatus.UNAUTHORIZED
            );
        }

        return { ...user };
    }
}
