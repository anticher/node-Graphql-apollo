import { main as startServer } from './server.js'
import { config } from 'dotenv'

const port = config().parsed.PORT || 3000

startServer()
    .then((server) => {
        return server.listen({port})
    })
    .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`)
    })
