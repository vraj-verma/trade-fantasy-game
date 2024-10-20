import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { MONGOCONFIG } from '../config/db/mongo/mongo.config';
import { AuthService } from '../auth/auth.service';
import { MysqlModule } from '../config/db/sql/mysql.module';
import { AuthModule } from '../auth/auth.module';
import { MatchesService } from '../matches/matches.service';


@Module({
  imports: [
    ...MONGOCONFIG,
    MysqlModule,
    AuthModule,
  ],
  controllers: [GamesController],
  providers:
    [GamesService,
      AuthService,
      MatchesService
    ],
})
export class GamesModule { }
