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
import {DepartmentResolver} from './resolvers/DepartmentResolver';
import {DeviceResolver} from './resolvers/DeviceResolver';
import {DocumentResolver} from './resolvers/DocumentResolver';
import {FairDayResolver} from './resolvers/FairDayResolver';
import {FairDeviceResolver} from './resolvers/FairDeviceResolver';
import {ApolloServerLoaderPlugin} from 'type-graphql-dataloader';
import {NodeResolver} from './resolvers/NodeResolver';
import {OrganizationResolver} from './resolvers/OrganizationResolver';
import {ConversationResolver} from './resolvers/ConversationResolver';
import {FairInfoResolver} from './resolvers/FairInfoResolver';
import {FairProductResolver} from './resolvers/FairProductResolver';
import {FairResourceResolver} from './resolvers/FairResourceResolver';
import {ImageResolver} from './resolvers/ImageResolver';
import {LanguageResolver} from './resolvers/LanguageResolver';
import {MessageResolver} from './resolvers/MessageResolver';
import {OrderResolver} from './resolvers/OrderResolver';
import {PrinterResolver} from './resolvers/PrinterResolver';
import {PrintJobResolver} from './resolvers/PrintJobResolver';
import {ProductGroupResolver} from './resolvers/ProductGroupResolver';
import {ProductResolver} from './resolvers/ProductResolver';
import {RsvpStateResolver} from './resolvers/RsvpStateResolver';
import {StaffMemberResolver} from './resolvers/StaffMemberResolver';

async function main() {
    const schema = await buildSchema({
        resolvers: [FairResolver, FairInfoResolver, StaffMemberResolver, PrinterResolver, RsvpStateResolver, ProductResolver, ProductGroupResolver, PrintJobResolver, MessageResolver, OrderResolver, LanguageResolver, ImageResolver, FairProductResolver, FairResourceResolver, DepartmentResolver, ConversationResolver, NodeResolver, OrganizationResolver, DocumentResolver, DeviceResolver, FairDayResolver, FairDeviceResolver, UserResolver, UserGroupResolver, BoothResolver, MeetingResolver, CompanyResolver],
        emitSchemaFile: true,
    });

    const app = Express();

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerLoaderPlugin(),
        ],
    });

    await server.start();

    server.applyMiddleware({app});

    app.listen(4000, () =>
        console.log('Server is running on http://localhost:4000/graphql')
    );
}

main();