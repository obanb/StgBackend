import {Collection, Db, MongoClient, MongoClientOptions} from 'mongodb';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import {pipe} from '../../node_modules/fp-ts/lib/pipeable';
import * as XLSX from 'xlsx';

interface HeaderLine {
    header: string;
    property: string;
}
interface QueryInput {
    query: {};
    collection: string;
    projection: {
        type: string;
        list: HeaderLine[];
    };
    config: {
        allowEmpty: boolean;
    };
}

const uri = `mongodb+srv://admin:nimda@cluster0.6tq4i.mongodb.net/sample_training?retryWrites=true&w=majority`;
const fakeInput: QueryInput = {
    query: {name: 'Wetpaint'},
    collection: 'companies',
    projection: {type: 'property', list: [{header: 'URL', property: 'homepage_url'}]},
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
    // pipe(
    //     database,
    //     getCollection(input),
    // );
    const projection = input.projection.list.reduce((acu, next) => {
        return {...acu, [next.property]: 1};
    }, {});
    const cursor = coll.find(input.query, {sort: {_id: 1}, projection: {_id: 0, ...projection}});
    const result = await cursor.toArray();
    return result;
};

const getConnectedClient = (uri: string, options?: MongoClientOptions) =>
    TE.tryCatch<DatabaseError, MongoClient>(async () => MongoClient.connect(uri, options), databaseError(`Get database client error.`));

const getDatabase = (name?: string) => (client: MongoClient) =>
    TE.tryCatch<DatabaseError, Db>(async () => client.db(name ? name : undefined), databaseError(`Get database ${name} error.`));

const getCollection = (name: string) => (database: Db) =>
    E.tryCatch<DatabaseError, Collection<any>>(() => database.collection(name), databaseError(`Get database collection ${name} error.`));

const res = () => pipe(getConnectedClient(uri, {useNewUrlParser: true}), TE.chain(getDatabase()), TE.map(executeQuery(fakeInput)));

interface DatabaseError {
    type: 'DatabaseError';
    errorMessage: string;
    rawError: unknown;
}

const databaseError = (errorMessage: string) => (error: unknown): DatabaseError => ({
    type: 'DatabaseError',
    errorMessage,
    rawError: error,
});


export const xlsxTemplate = async (headerLine: HeaderLine[]) => {
    try {
        const headerLines = headerLine.map(line => line.header);

        const rows = headerLine.map(line => line.property);

        return [headerLines, ...rows];
    } catch (e) {
        throw e;
    }
};

export const generateXlsx = () => async (): Promise<any> => {
    let template: any = null;

    // název záložky v .xlsx
    const wsName = 'Sestava';
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(template);

    // Šířky řádků podle počtu znaků
    ws['!cols'] = template[0].map((header: string) => {
        return {wch: header.length};
    });

    // add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, wsName);

    // generate file buffer
    return XLSX.write(wb, {type: 'buffer'});
};
