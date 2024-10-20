import { ApiProperty } from "@nestjs/swagger";
import { MatchDetails, PlayerStatistics, Result } from "../../types/games.type";

export class GameDTO {

    @ApiProperty()
    matchId: number;

    @ApiProperty()
    playerId: number;

    @ApiProperty()
    playerName: string;

    @ApiProperty()
    matchDetails: MatchDetails;

    @ApiProperty()
    playerStatistics: PlayerStatistics;

    @ApiProperty()
    gameResult: Result;

    @ApiProperty()
    dataFeededBy?: string;
}