import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../models/users.model';

export const mysqlConfig = [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'tfg',
        synchronize: true,
        retryAttempts: 12,
        retryDelay: 5000
    }),
    TypeOrmModule.forFeature([Users])


];