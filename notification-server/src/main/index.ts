import 'reflect-metadata'
import 'dotenv/config'
import '../kafka'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import AccountResolver from '../accounts/accountResolver'

const start = async () => {
  const schema = await buildSchema({
    resolvers: [AccountResolver],
    emitSchemaFile: true
  })

  const server = new ApolloServer({
    schema
  })

  const { url } = await server.listen(process.env.PORT ?? 5577)

  console.log(`Server running at ${url}`)
}

start()