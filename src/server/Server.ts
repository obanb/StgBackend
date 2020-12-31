import * as bodyParser from 'body-parser';
import * as express from 'express';
import {factory, logger} from '../modules/common/logger';
import {getRes} from '../modules/parser';
import {router} from '../modules/api';

const log = logger(factory.getLogger('server'));

export interface ExpressConfig {
    readonly devMode: boolean;
}

let app: express.Express;


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

        app.use('/api', router);

        app.get('/report', async(_, res) => {
            const report = await getRes()
            res.send(report);
        });

        // app.use('/graphql', verify);

        const PORT = process.env.PORT || 8080;
        const expressServer = app.listen(PORT, async () => {
            log.info(`server ready on port ${PORT}`)();
        });

    },
};
