import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'

import { TodoResolver } from './resolvers/todoResolver'
import { BoothResolver } from './resolvers/boothResolver'

async function main() {
    const schema = await buildSchema({
        resolvers: [TodoResolver, BoothResolver],
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