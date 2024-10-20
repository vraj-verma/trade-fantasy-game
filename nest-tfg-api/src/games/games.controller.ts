import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GameDTO } from './dto/game.dto';
import { Game } from '../schema/games.schema';
import { GamesService } from './games.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthService } from '../auth/auth.service';
import { ValidationPipe } from '../pipes/joi.pipe';
import { MatchesService } from '../matches/matches.service';
import { SuccessResponse } from '../types/success-response.type';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JoiValidationSchema } from '../validations/schema.validation';


@ApiTags('Games Controller')
@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {

  constructor(
    private readonly authService: AuthService,
    private readonly gamesService: GamesService,
    private readonly matchesService: MatchesService,
  ) { }

  @ApiOperation({ summary: 'Create a game' })
  @ApiResponse({ type: SuccessResponse })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createGame(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new ValidationPipe(JoiValidationSchema.gameSchema)) payload: GameDTO
  ) {

    const user = req.user;

    const isPlayerExist = await this.authService.getByUserId(payload.playerId);

    if (!isPlayerExist) {
      throw new HttpException(`Player with id: ${payload.playerId} does not exist`, HttpStatus.NOT_FOUND);
    }

    const match = await this.matchesService.getMatchById(payload.matchId);

    if (!match) {
      throw new HttpException(`Match with id: ${payload.matchId} does not exist, please create match first`, HttpStatus.NOT_FOUND);
    }

    payload.dataFeededBy = user['email'];

    const response = await this.gamesService.createGame(payload);

    if (!response) {
      throw new HttpException('Failed to create game', HttpStatus.NOT_IMPLEMENTED);
    }

    res.status(201).json(response)

  }


  @ApiOperation({ summary: 'Get a game by player Id' })
  @ApiResponse({ type: Game })
  @Get(':id')
  async getByPlayerId(
    @Res() res: Response,
    @Param('id', ParseIntPipe) playerId: number,
    @Query('matchId') matchId: number
  ) {

    const response = await this.gamesService.getByPlaterId(playerId, matchId);

    if (!response) {
      throw new HttpException(
        `Np data found with player id: ${playerId}`,
        HttpStatus.NOT_FOUND
      );
    }

    res.status(200).json(response)

  }


  @ApiOperation({ summary: 'Update a game by player Id & match Id' })
  @ApiResponse({ type: Boolean })
  @Put()
  async updateGameById(
    @Res() res: Response,
    @Body(new ValidationPipe(JoiValidationSchema.gameSchema)) payload: GameDTO
  ) {

    const response = await this.gamesService.updateGameByMatchId(payload.matchId, payload.playerId, payload);

    if (!response) {
      throw new HttpException(
        `Failed to update game`,
        HttpStatus.NOT_IMPLEMENTED
      );
    }

    res.status(200).json({
      message: `Game with matchId: ${payload.matchId} of playerId: ${payload.playerId}, updated successfully`,
      status: true
    })

  }


  @ApiOperation({ summary: 'Delete a game by match Id' })
  @ApiResponse({ type: SuccessResponse })
  @Delete()
  async deleteGame(
    @Res() res: Response,
    @Query('matchId', ParseIntPipe) matchId: number,
  ) {

    if (!matchId) {
      throw new HttpException(
        `Please provide matchId`,
        HttpStatus.BAD_REQUEST
      );
    }

    const response = await this.gamesService.deleteGame(matchId);

    if (!response) {
      throw new HttpException(
        `Failed to delete match`,
        HttpStatus.NOT_IMPLEMENTED
      );
    }

    res.status(200).json({
      message: `Game with matchId: ${matchId} deleted successfully`,
      status: true
    })

  }




}
