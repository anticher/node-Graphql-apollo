// import { resolvers as artists } from './modules/artists/resolvers.js'
import { ApolloServer, gql } from 'apollo-server'
// import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
// import { loadSchema } from '@graphql-tools/load'

import { mergeTypeDefs } from '@graphql-tools/merge'

import { main as artists } from './modules/artists/main.js'

import { main as bands } from './modules/bands/main.js'

import { main as genres } from './modules/genres/main.js'

export async function main() {
    const artistsModule = await artists()
    const bandsModule = await bands()
    const genresModule = await genres()
    // const typeDefs = await loadSchema('app/modules/artists/types.graphql', {
    //     loaders: [new GraphQLFileLoader()],
    // })

    const types = [artistsModule.typeDefs, bandsModule.typeDefs, genresModule.typeDefs]

    const typeDefs = mergeTypeDefs(types)


    // const resolvers = artists

    const resolvers = { ...artistsModule.resolvers, ...bandsModule.resolvers, ...genresModule.resolvers }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        // cache: 'bounded',
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
                bandsAPI: bandsModule.bandsAPI,
                genresAPI: genresModule.genresAPI
            }
        },
    })

    return server
}
