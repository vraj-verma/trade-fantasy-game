import { ApiProperty } from "@nestjs/swagger";
import { GAME_RESULT } from "../enums/game-result.enum";
import { MATCH_TYPE } from "../enums/games.enum";

export class MatchDetails {

    @ApiProperty()
    matchType: MATCH_TYPE;

    @ApiProperty()
    opponentTeam: string;

    @ApiProperty()
    venue: string;

    @ApiProperty()
    date: string;
}

export class Result {

    @ApiProperty()
    matchResult: GAME_RESULT;

    @ApiProperty()
    playerOfTheMatch: string;

    @ApiProperty()
    teamScore: number;

    @ApiProperty()
    opponentScore: number;

    @ApiProperty()
    resultDescription: string;
}

export class PlayerStatistics {

    @ApiProperty()
    runsScored: number;

    @ApiProperty()
    ballsFaced: number;

    @ApiProperty()
    fours: number;

    @ApiProperty()
    sixes: number;

    @ApiProperty()
    wicketsTaken: number;

    @ApiProperty()
    oversBowled: number;

    @ApiProperty()
    catches: number;

    @ApiProperty()
    runOuts: number;
}