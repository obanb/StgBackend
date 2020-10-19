import {GraphQLSchema} from 'graphql';
import {addResolveFunctionsToSchema, makeExecutableSchema} from 'graphql-schema-tools';
import {importSchema} from 'graphql-import';
import {TestGraphqlResolvers} from '../modules/test/shell/test.graphql.resolvers';

const graphQlSchemaFile: string = 'node_modules\\StgGraphql\\graphql.schema.graphql';

const resolvers: any = {
    Query: {
        ...TestGraphqlResolvers.Queries,
    },
};

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [importSchema(graphQlSchemaFile)],
    resolvers: {},
});

addResolveFunctionsToSchema(schema, resolvers);

export {schema};
