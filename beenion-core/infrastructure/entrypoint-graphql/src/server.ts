import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

export const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers
})

const PORT = 4000
let app = express()

app.use('*', cors({ origin: 'http://localhost:3000' }))
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT)
