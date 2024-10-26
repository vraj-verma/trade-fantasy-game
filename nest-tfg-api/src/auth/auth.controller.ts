import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignupDTO } from './dto/signup.dto';
import { Utility } from '../helper/util';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from '../types/success-response.type'
import { SigninDTO } from './dto/signin.dto';
import { USER_TYPE } from '../enums/user-type.enum';
import { v4 as uuid } from 'uuid';
import { JwtAuthGuard } from '../guards/jwt.guard';



@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly utility: Utility,
    private readonly authService: AuthService,

  ) { }

  @ApiOperation({ summary: 'Register an account' })
  @ApiResponse({ type: SuccessResponse, status: 201 })
  @Post('signup')
  async signup(
    @Res() res: Response,
    @Body() payload: SignupDTO,
  ) {

    const user = await this.authService.getByEmail(payload.email);

    if (user) {
      throw new HttpException(
        `User with email: ${payload.email} already exist`,
        HttpStatus.CONFLICT
      );
    }

    payload.password = await this.utility.encryptPassword(payload.password);
    payload.country = payload.country ? payload.country : 'India';
    payload.usertype = payload.usertype ? payload.usertype : USER_TYPE.COMMENTATOR;


    const response = await this.authService.createUser(payload);

    if (!response) {
      throw new HttpException(
        `Failed to create an account, please try again`,
        HttpStatus.NOT_IMPLEMENTED
      );
    }

    res.status(201).json(
      {
        message: 'Account created successfully',
        status: true
      }
    );

  }


  @Post('signin')
  async signin(
    @Res() res: Response,
    @Body() payload: SigninDTO
  ) {

    const user = await this.authService.getByEmail(payload.email);

    if (!user) {
      throw new HttpException(
        `User with email: ${payload.email}, does not exist`,
        HttpStatus.NOT_FOUND
      );
    }

    if (user.sessionId) {
      throw new HttpException(
        `User already signed in on another device`,
        HttpStatus.NOT_FOUND
      );
    }

    await this.authService.setSession(payload.email, uuid())

    const decodedPassword = await this.utility.decryptPassword(payload.password, user.password);

    if (!decodedPassword) {
      throw new HttpException(
        `Incorrect password`,
        HttpStatus.BAD_REQUEST
      );
    }

    const JWTPayload = {
      userId: user.userId,
      email: user.email,
      name: user.name
    }

    const token = await this.utility.generateJWT(JWTPayload);

    user.password = undefined;

    res.status(200).json({
      ...user,
      token
    });
  }


  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response
  ) {

    const user = req.user;

    const response = await this.authService.removeSession(user['email']);

    if (!response) {
      throw new HttpException(
        "Failed to logout",
        HttpStatus.NOT_IMPLEMENTED
      )
    }

    res.status(200).json({
      status: true,
      message: 'Logout successfully'
    });
  }

}
