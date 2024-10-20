import { Module } from '@nestjs/common';
import { mysqlConfig } from './mysql.config';



@Module({
  providers: [...mysqlConfig],
  exports: [...mysqlConfig],
})
export class MysqlModule {}