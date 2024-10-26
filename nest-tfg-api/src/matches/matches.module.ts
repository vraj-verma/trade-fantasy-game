import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MysqlModule } from '../config/db/sql/mysql.module';
import { Users } from '../models/users.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MysqlModule, ],
  controllers: [MatchesController],
  providers: [MatchesService, ],
})
export class MatchesModule {}
   