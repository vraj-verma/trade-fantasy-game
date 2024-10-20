import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MysqlModule } from '../config/db/sql/mysql.module';

@Module({
  imports: [MysqlModule],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
