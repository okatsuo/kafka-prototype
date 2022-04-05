import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { constants } from './config'
import UserResolver from '../account/accountResolver'

const start = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true
  })

  const server = new ApolloServer({ schema })

  const { url } = await server.listen(constants.serverPort)
  console.log(`[Account-Server] Server running at: ${url}`)
}

start()