import { main as startServer } from './server.js'

startServer()
    .then((server) => {
        return server.listen()
    })
    .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`)
    })
