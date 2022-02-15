import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'

import { BoothResolver } from './resolvers/boothResolver'
import { AttendanceResolver} from './resolvers/attendanceResolver';

async function main() {
    const schema = await buildSchema({
        resolvers: [BoothResolver, AttendanceResolver],
        emitSchemaFile: true,
    })

    const app = Express()

    const server = new ApolloServer({
        schema,
    })

    await server.start()

    server.applyMiddleware({ app })

    app.listen(4000, () =>
        console.log('Server is running on http://localhost:4000/graphql')
    )
}

main()