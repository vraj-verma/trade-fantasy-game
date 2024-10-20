import { Module } from '@nestjs/common';
import { MysqlModule } from './config/db/sql/mysql.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MongoModule } from './config/db/mongo/mongo.module';
import { GamesModule } from './games/games.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [
    MysqlModule,
    AuthModule,
    MongoModule,
    JwtModule.register({
      global: true,
      secret: 'test-secreteeeeee',
      signOptions: { expiresIn: '1d' },
    }),
    GamesModule,
    MatchesModule,

  
  ],
})
export class AppModule { }
