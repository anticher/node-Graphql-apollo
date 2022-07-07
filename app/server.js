// import { resolvers as artists } from './modules/artists/resolvers.js'
import { ApolloServer, gql } from 'apollo-server'
// import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
// import { loadSchema } from '@graphql-tools/load'

import { main as artists } from './modules/artists/main.js'

export async function main() {
    const artistsModule = await artists()

    // const typeDefs = await loadSchema('app/modules/artists/types.graphql', {
    //     loaders: [new GraphQLFileLoader()],
    // })

    const typeDefs = artistsModule.typeDefs

    // const resolvers = artists

    const resolvers = artistsModule.resolvers

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        context: ({ req }) => {
            const authToken = req.headers.authorization || ''
            return { authToken }
        },
        // dataSources: () => {
        //     return {
        //         artistsAPI: new ArtistsAPI(),
        //     }
        // },
        dataSources: () => {
            return {
                artistsAPI: artistsModule.artistsAPI,
            }
        },
    })

    return server
}
