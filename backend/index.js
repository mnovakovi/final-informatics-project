const { ApolloServer } = require('@apollo/server')
const cors = require('cors')
const express = require('express')
const { readFileSync } = require('fs')
const resolversRegular = require('./graphql/rootResolver')
const resolversDataLoader = require('./graphql/rootResolverDataLoader')
const { expressMiddleware } = require('@apollo/server/express4')
const readline = require('readline')
const { createCourseByIdLoader, createCoursesByProfessorLoader } = require('./dataLoaders/courseLoaders')
const { createProfessorByCourseLoader } = require('./dataLoaders/professorLoaders')
const { createStudentByIdLoader, createStudentsByCourseLoader } = require('./dataLoaders/studentLoaders')
const { createSubmissionByIdLoader } = require('./dataLoaders/submissionLoaders')
const { createTaskByIdLoader, createTasksByCourseLoader } = require('./dataLoaders/taskLoaders')
const { ApolloServerPluginCacheControl } = require('@apollo/server/plugin/cacheControl')
const responseCachePlugin = require('@apollo/server-plugin-response-cache').default
const {InMemoryLRUCache} = require('@apollo/utils.keyvaluecache')

const app = express()
app.use(cors(), express.json())

app.get('/', (req, res) => {
  res.send("Hello from Express Server!")
})

const typeDefs = readFileSync(require.resolve('./graphql/schema.graphql')).toString('utf-8')

function promptForDataLoader() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question('Use DataLoader-based resolvers? (y/n): ', (answer) => {
      rl.close()
      resolve(answer.toLowerCase() === 'y')
    })
  })
}

async function getContext({ req }) {
  // const coursesByProfessorLoader = createCoursesByProfessorLoader()
  // const courseByIdLoader = createCourseByIdLoader()
  // const professorByCourseLoader = createProfessorByCourseLoader()
  // const studentByIdLoader = createStudentByIdLoader()
  // const studentsByCourseLoader = createStudentsByCourseLoader()
  // const submissionByIdLoader = createSubmissionByIdLoader()
  // const taskByIdLoader = createTaskByIdLoader()
  // const tasksByCourseLoader = createTasksByCourseLoader()
  // const context = {
  //   coursesByProfessorLoader, courseByIdLoader, professorByCourseLoader,
  //   studentByIdLoader, studentsByCourseLoader, submissionByIdLoader, taskByIdLoader, tasksByCourseLoader
  // }
  if (req) {
    console.log('------------------NEW REQUEST---------------------')
    const authHeader = req.headers.authorization || ''
    // context.authHeader = authHeader
    return {authHeader}
  }

  return {}
}

async function startApolloServer() {
  const useDataLoader = await promptForDataLoader();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: useDataLoader ? resolversDataLoader : resolversRegular,
    cache: new InMemoryLRUCache(),
    plugins: [
      ApolloServerPluginCacheControl(
        {
          calculateHttpHeaders: true
        }
      ),
      responseCachePlugin({
        sessionId: ({ request }) => request.http.headers.get('authorization') || null
      })
    ]
  })

  apolloServer.start().then(() => {
    app.use(
      '/graphql',
      expressMiddleware(apolloServer, {
        context: getContext
      })
    );
  });

  const PORT = 9000;

  app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`)
  })
}

startApolloServer();