import { Module } from '@nestjs/common';
import { mysqlConfig } from './mysql.config';

@Module({
  imports:[...mysqlConfig],
  exports: [...mysqlConfig],
})
export class MysqlModule {}