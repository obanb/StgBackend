import {testService} from '../core/testService';

export const TestGraphqlResolvers = {
    Queries: {
        test: () => ({
            test: () => testService().test(),
        }),
    },
}
