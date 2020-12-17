import {Collection, Db, MongoClient, MongoClientOptions} from 'mongodb';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import {pipe} from '../../node_modules/fp-ts/lib/pipeable';

interface QueryInput {
    query: {};
    collection: string;
    fields: string[];
    config: {
        allowEmpty: boolean;
    };
}

const uri = `mongodb+srv://admin:nimda@cluster0.6tq4i.mongodb.net/sample_training?retryWrites=true&w=majority`;
const fakeInput: QueryInput = {
    query: {name:"Wetpaint"},
    collection: 'companies',
    fields: ['homepage_url'],
    config: {
        allowEmpty: false,
    },
};

export const getRes = async () => {
    const r = await pipe(
        res(),
        TE.fold((e) => e as any, (r) => () => r),
    )();
    return r;
};

const executeQuery = (input: QueryInput) => async (database: Db) => {
    const coll = database.collection(input.collection);
    // pipe(
    //     database,
    //     getCollection(input),
    // );
    const projection = input.fields.reduce((acu, next) => {
        return {...acu, [next]: 1};
    }, {});
    const cursor = coll.find(input.query, {sort: {_id: 1}, projection: {_id: 0, ...projection}});
    const result = await cursor.toArray();
    return result;
};

const getConnectedClient = (uri: string, options?: MongoClientOptions) =>
    TE.tryCatch<Error, MongoClient>(
        async () =>
            MongoClient.connect(
                uri,
                options,
            ),
        (e: unknown) => new Error(JSON.stringify(e)),
    );

const getDatabase = (databaseName: string) => (client: MongoClient) =>
    TE.tryCatch<Error, Db>(async () => client.db(databaseName), (e: unknown) => new Error(JSON.stringify(e)));

const getCollection = (input: QueryInput) => (database: Db) =>
    E.tryCatch<Error, Collection<any>>(() => database.collection(input.collection), (e: unknown) => new Error(JSON.stringify(e)));

const res = () =>
    pipe(
        getConnectedClient(uri, {useNewUrlParser: true}),
        TE.chain(getDatabase('localhost')),
        TE.map(executeQuery(fakeInput)),
    );
