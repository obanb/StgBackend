import {GraphQLSchema} from 'graphql';
import {addResolveFunctionsToSchema, makeExecutableSchema} from 'graphql-schema-tools';
import {importSchema} from 'graphql-import';
import {testGraphqlResolvers} from '../modules/test/shell/test.graphql.resolvers';

// const graphQlSchemaFile: string = 'node_modules\\StgGraphql\\graphql.schema.graphql';
const graphQlSchemaFile: string = '/home/archie/Plocha/dev/StgBackend/node_modules/StgGraphql/graphql.schema.graphql';

const resolvers: any = {
    Query: {
        ...testGraphqlResolvers.Queries,
    },
};

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [importSchema(graphQlSchemaFile)],
    resolvers: {},
});

addResolveFunctionsToSchema(schema, resolvers);

export {schema};
