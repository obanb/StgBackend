import * as mongoose from 'mongoose';
import {Connection} from 'mongoose';

export const database = {
    start: (): Promise<Connection> => {
        return new Promise((resolve, reject) => {
            const {DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_NAME, DATABASE_ENDPOINT} = process.env;
            if (!DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_PORT || !DATABASE_NAME || !DATABASE_ENDPOINT) {
                throw new Error(
                    'Enviroment value for database connection is not set. "DATABASE_USER", "DATABASE_PASSWORD", "DATABASE_HOST", "DATABASE_PORT", "DATABASE_NAME","DATABASE_ENDPOINT"',
                );
            }
            mongoose.connect(
                `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_ENDPOINT}:${DATABASE_PORT}/${DATABASE_NAME}`,
                {useNewUrlParser: true},
            );
            const conn = mongoose.connection;
            conn.once('open', () => {
                resolve(conn);
            });
            conn.on('error', (err) => {
                reject(err);
            });
        });
    },
};
