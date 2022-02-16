import 'reflect-metadata';
import {ApolloServer} from 'apollo-server-express';
import * as Express from 'express';
import {buildSchema} from 'type-graphql';

import {BoothResolver} from './resolvers/BoothResolver';
import {FairResolver} from './resolvers/FairResolver';
import {UserResolver} from './resolvers/UserResolver';
import {MeetingResolver} from './resolvers/MeetingResolver';
import {CompanyResolver} from './resolvers/CompanyResolver';
import {UserGroupResolver} from './resolvers/UserGroupResolver';

async function main() {
    const schema = await buildSchema({
        resolvers: [FairResolver, UserResolver, UserGroupResolver, BoothResolver, MeetingResolver, CompanyResolver],
        emitSchemaFile: true,
    });

    const app = Express();

    const server = new ApolloServer({
        schema,
    });

    await server.start();

    server.applyMiddleware({app});

    app.listen(4000, () =>
        console.log('Server is running on http://localhost:4000/graphql')
    );
}

main();