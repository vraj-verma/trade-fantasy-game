import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { MatchDetails, PlayerStatistics, Result } from "../types/games.type";

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            delete ret.id;
            return ret;
        }
    }
})
export class Game {

    @Prop()
    gameId: mongoose.Schema.Types.ObjectId;

    @Prop()
    playerId: number;

    @Prop()
    matchId: number;

    @Prop()
    playerName: string;

    @Prop()
    matchDetails: MatchDetails;

    @Prop({ required: false })
    playerStatistics: PlayerStatistics;

    @Prop({ required: false })
    gameResult: Result;

    @Prop()
    dataFeededBy: string

}

export const GameSchema = SchemaFactory.createForClass(Game);