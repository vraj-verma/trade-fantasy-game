import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MatchDTO } from './dto/match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/users.model';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {

    constructor(
        @InjectRepository(Users) private db:  Repository<Users>,
    ) { }

    async createMatch(payload: MatchDTO) {
        try {
            const sqlQuerry = `INSERT INTO matches(teamA, teamB) 
            VALUES(?, ?)`;
            const [response] = await this.db.query(sqlQuerry,
                [
                    payload.teamA,
                    payload.teamB,
                ]
            );

            return response ? response.insertId : null;
        } catch (error) {
            console.error('Failed to create user ❌', error)
            throw new HttpException('Failed to create user, try again', HttpStatus.NOT_IMPLEMENTED);
        }
    }


    async getMatchById(matchId: number) {
        try {
            const sqlQuery = `SELECT teamA, teamB FROM matches WHERE matchId = ?`;
            const [response] = await this.db.query(sqlQuery, [matchId]);

            return response && response.length > 0 ? response[0] : null;
        } catch (error) {
            console.error('Failed to fetch match by matchId ❌', error)
            throw new HttpException('Failed to fetch match by matchId', HttpStatus.NOT_IMPLEMENTED);
        }
    }
}
