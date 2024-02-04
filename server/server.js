const express = require('express')
const { createServer } = require('http')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { useServer } = require('graphql-ws/lib/use/ws')
const { authMiddleware } = require('./utils/auth')
const { WebSocketServer } = require('ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { PORT = 3001 } = process.env
const app = express()
const db = require('./config/connection')
const path = require('path')
const { typeDefs, resolvers } = require('./schemas')
const httpServer = createServer(app)
const startApolloServer = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })
  const serverCleanup = useServer({ schema }, wsServer)
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authMiddleware,
    })
  )

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
  }

  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`)
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
      console.log(`Use GraphQL WebSocket at ws://localhost:${PORT}/graphql`)
    })
  })
}

startApolloServer()
