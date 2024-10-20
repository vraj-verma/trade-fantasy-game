import { MongooseModule } from "@nestjs/mongoose";
import { Game, GameSchema } from "../../../schema/games.schema";


export const MONGOCONFIG = [
     MongooseModule.forRoot(
          'mongodb+srv://sumitverma28004:YWyTjZoo0iECd6si@cluster0.eqpyw.mongodb.net/',
          {
               dbName: 'tfg'
          }
     ),
     MongooseModule.forFeature(
          [
               {
                    name: Game.name,
                    schema: GameSchema
               },
          ]
     ),
];