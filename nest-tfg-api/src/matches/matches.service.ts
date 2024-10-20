import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { MatchDTO } from './dto/match.dto';

@Injectable()
export class MatchesService {

    constructor(
        @Inject('MYSQL_CONNECTION') private db: mysql.Connection,
    ) { }

    async createMatch(payload: MatchDTO) {
        try {
            const sqlQuerry = `INSERT INTO matches(teamA, teamB) 
            VALUES(?, ?)`;
            const [response] = await this.db.query<ResultSetHeader>(sqlQuerry,
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
            const [response] = await this.db.query<RowDataPacket[]>(sqlQuery, [matchId]);

            return response && response.length > 0 ? response[0] : null;
        } catch (error) {
            console.error('Failed to fetch match by matchId ❌', error)
            throw new HttpException('Failed to fetch match by matchId', HttpStatus.NOT_IMPLEMENTED);
        }
    }
}
