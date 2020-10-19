import * as bodyParser from 'body-parser';
import {schema} from '../graphql';
import * as express from 'express';
import {Context} from 'apollo-server-core';
import {createApolloServer} from './createApolloServer';
import {factory, logger} from '../modules/common/logger';
import * as SocketIO from 'socket.io';

const GRAPHQL_URL_PATH = '/graphql';

const log = logger(factory.getLogger('server'));

export interface ExpressConfig {
    readonly devMode: boolean;
}

let app: express.Express;
export let io: SocketIO.Server;

export const server = {
    run: async ({devMode}: ExpressConfig) => {
        app = express();

        app.use(bodyParser.json({limit: '1mb'}));
        app.use(bodyParser.json(), (err: any, req: any, res: any, next: any) => {
            if (err) {
                throw new Error(err);
            } else {
                next();
            }
        });

        app.use('*', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        app.get('/healthz', (_, res) => {
            res.sendStatus(200);
        });
        app.options('*', (req, res) => {
            res.send('');
        });

        // app.use('/graphql', verify);

        const apolloServer = createApolloServer({
            schema,
            debug: devMode,
            createContextFn: async (_: Context<any>) => ({}),
        });
        apolloServer.applyMiddleware({app, path: GRAPHQL_URL_PATH});

        const PORT = process.env.PORT || 8080;
        const expressServer = app.listen(PORT, async () => {
            log.info(`server ready on port ${PORT}`)();
        });
        io = SocketIO(expressServer);
    },
};
