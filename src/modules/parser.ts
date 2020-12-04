import {Collection, Db, MongoClient, MongoClientOptions} from 'mongodb';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import {database} from '../server/database';
import {pipe} from '../../node_modules/fp-ts/lib/pipeable';

interface QueryInput {
    query: {};
    collection: string;
    fields: string[];
    config: {
        allowEmpty: boolean;
    };
}

const uri =
    'mongodb://admin:admin@localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=localhost+-+imported+on+18.9.2019';
const fakeInput: QueryInput = {
    query: {'elektrina.eanSpotrebni': {$exists: true}},
    collection: 'odssmlouvyodbernychmist',
    fields: ['elektrina.eanSpotrebni', 'cisloSap', 'plyn.eic'],
    config: {
        allowEmpty: false,
    },
};

export const getRes = async () => {
    const r = await pipe(
        res(),
        TE.fold(
            (e) => e as any,
            (r) => () => r,
        ),
    )();
    return r;
};


const executeQuery = (input: QueryInput) => async (database: Db) => {
    const coll = database.collection(input.collection);
    pipe(
        database,
        getCollection(input),
        E.map()
    )
    const projection = input.fields.reduce((acu, next) => {
        return {...acu, [next]: 1};
    }, {});
    const cursor = coll.find(input.query, {sort: {_id: 1}, projection: {_id: 0, ...projection}});
    const result = await cursor.toArray();
    return result;
};


const getConnectedClient = (uri: string, options?: MongoClientOptions) =>
    TE.tryCatch<Error, MongoClient>(
        async () => MongoClient.connect(uri, options),
        (e: unknown) => new Error(JSON.stringify(e)),
    );

const getDatabase = (databaseName: string) => (client: MongoClient) =>
    TE.tryCatch<Error, Db>(
        async () => client.db(databaseName),
        (e: unknown) => new Error(JSON.stringify(e)),
    );

const getCollection = (input: QueryInput) => (database: Db) =>
    E.tryCatch<Error, Collection<any>>(
        () => database.collection(input.collection),
        (e: unknown) => new Error(JSON.stringify(e)),
    );

const res = () => pipe(getConnectedClient(uri, {useNewUrlParser: true}), TE.chain(getDatabase('localhost')), TE.map(executeQuery(fakeInput)));
