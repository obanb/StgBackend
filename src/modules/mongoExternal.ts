import {Collection, Db, MongoClient, MongoClientOptions} from 'mongodb';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import {createDatabaseError, DatabaseError} from './errors';

export const getConnectedClient = (uri: string, options?: MongoClientOptions) =>
    TE.tryCatch<DatabaseError, MongoClient>(async () => MongoClient.connect(uri, options), createDatabaseError(`Get database client error.`));

export const getDatabase = (name?: string) => (client: MongoClient) =>
    TE.tryCatch<DatabaseError, Db>(async () => client.db(name ? name : undefined), createDatabaseError(`Get database ${name} error.`));

export const getCollection = (name: string) => (database: Db) =>
    E.tryCatch<DatabaseError, Collection<any>>(() => database.collection(name), createDatabaseError(`Get database collection ${name} error.`));
