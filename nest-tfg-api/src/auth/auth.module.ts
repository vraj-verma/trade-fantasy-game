import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MysqlModule } from '../config/db/sql/mysql.module';
import { Utility } from '../helper/util';
import { JwtStrategy } from '../guards/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';



@Module({
  imports: [
    MysqlModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'test-queue10',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, Utility, JwtStrategy,],
  exports: [JwtStrategy, ClientsModule], 
})
export class AuthModule { }
