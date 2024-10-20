import * as joi from "joi";
import { MATCH_TYPE } from "../enums/games.enum";
import { USER_TYPE } from "../enums/user-type.enum";
import { GAME_RESULT } from "../enums/game-result.enum";

export class JoiValidationSchema {

    static signupSchema = joi.object({
        name: joi.string().min(2).max(20).required(),
        email: joi.string().min(2).max(20).required(),
        password: joi.string().min(2).max(20).required(),
        usertype: joi.string().valid(...Object.values(USER_TYPE)).optional().allow(null, '')
    });

    static matchSchema = joi.object({
        teamA: joi.string().required().min(2).max(50),
        teamB: joi.string().required().min(2).max(50)
    });

    static gameSchema = joi.object({
        matchId: joi.number().integer().required(),
        playerId: joi.number().integer().required(),
        playerName: joi.string().required(),
        matchDetails: joi.object({
            matchType: joi.string().valid(...Object.values(MATCH_TYPE)),
            opponentTeam: joi.string().required(),
            venue: joi.string().required(),
            date: joi.string().required()
        }),
        playerStatistics: joi.object({
            runsScored: joi.number().integer().required(),
            ballsFaced: joi.number().integer().required(),
            fours: joi.number().integer().required(),
            sixes: joi.number().integer().required(),
            wicketsTaken: joi.number().integer().required(),
            oversBowled: joi.number().integer().required(),
            catches: joi.number().integer().required(),
            runOuts: joi.number().integer().required(),
        }),
        gameResult: joi.object({
            matchResult: joi.string().valid(...Object.values(GAME_RESULT)),
            playerOfTheMatch: joi.string().required(),
            teamScore: joi.number().integer().required(),
            opponentScore: joi.number().integer().required(),
            resultDescription: joi.string().required()
        })
    });
}