import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { GameDTO } from './dto/game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from '../schema/games.schema';

@Injectable()
export class GamesService {

    constructor(
        @InjectModel(Game.name) private gameModel: Model<Game>,
    ) { }

    async createGame(payload: GameDTO) {
        try {
            const response = await this.gameModel.create(payload);
            return response ? response : null;
        } catch (error) {
            console.error('Failed to create game ❌', error)
            throw new HttpException('Failed to create game', HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async getByPlaterId(playerId: number, matchId: number): Promise<Game> {
        try {
            const filter = { _id: matchId, playerId }
            const response = await this.gameModel.findOne(filter);
            return response ? response as Game : null;
        } catch (error) {
            console.error('Failed to get player data ❌', error)
            throw new HttpException('Failed to get player data', HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async updateGameByMatchId(matchId: number, playerId: number, payload: GameDTO): Promise<boolean> {
        try {
            const filter = {  matchId,  playerId };

            const response = await this.gameModel.updateOne(filter, payload);
            return response ? response.modifiedCount > 0 : false;
        } catch (error) {
            console.error('Failed to update player data ❌', error)
            throw new HttpException('Failed to update player data', HttpStatus.NOT_IMPLEMENTED);
        }
    }

    async deleteGame(matchId: number): Promise<boolean> {
        try {
            const filter = { matchId };

            const response = await this.gameModel.deleteMany(filter);
            return response ? response.deletedCount > 0 : false;
        } catch (error) {
            console.error('Failed to delete player data ❌', error)
            throw new HttpException('Failed to delete player data', HttpStatus.NOT_IMPLEMENTED);
        }
    }
}
