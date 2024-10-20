import * as mysql from 'mysql2/promise';

export const mysqlConfig = [
    {
        provide: 'MYSQL_CONNECTION',
        useFactory: (): mysql.Pool => {
            try {
                const pool = mysql.createPool({
                    host: 'localhost',
                    port: 3306,
                    user: 'root',
                    password: '1234',
                    database: 'tfg',
                    // host: process.env.MYSQL_HOST,
                    // port: +(process.env.MYSQL_PORT),
                    // user: process.env.MYSQL_USER,
                    // password: process.env.MYSQL_PASSWORD,
                    // database: process.env.MYSQL_DB,
                    multipleStatements: true,
                    waitForConnections: true,
                    connectionLimit: 10,
                });
                console.info('Database connected ✔️');
                return pool;
            } catch (error) {
                console.error(error);
                process.exit(0);
            }
        },
    },
];