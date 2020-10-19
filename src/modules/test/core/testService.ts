import {factory, logger} from '../../common/logger';

const log = logger(factory.getLogger('testService'));


export const testService = () => ({
    test: () => {
        log.info(`test`)();
        return 'test backend value'
    },
});
