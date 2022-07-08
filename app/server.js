// import { resolvers as artists } from './modules/artists/resolvers.js'
import { ApolloServer, gql } from 'apollo-server'
// import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
// import { loadSchema } from '@graphql-tools/load'

import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { main as getArtistsModule } from './modules/artists/main.js'

import { main as getBandsModule } from './modules/bands/main.js'

import { main as getGenresModule } from './modules/genres/main.js'

import { main as getTracksModule } from './modules/tracks/main.js'

import { main as getAlbumsModule } from './modules/albums/main.js'

export async function main() {
    const artistsModule = await getArtistsModule()
    const bandsModule = await getBandsModule()
    const genresModule = await getGenresModule()
    const tracksModule = await getTracksModule()
    const albumsModule = await getAlbumsModule()
    // const typeDefs = await loadSchema('app/modules/artists/types.graphql', {
    //     loaders: [new GraphQLFileLoader()],
    // })

    const types = [
        artistsModule.typeDefs,
        bandsModule.typeDefs,
        genresModule.typeDefs,
        tracksModule.typeDefs,
        albumsModule.typeDefs
    ]


    const typeDefs = mergeTypeDefs(types)


    // const resolvers = artists

    // const resolvers = {
    //     ...artistsModule.resolvers,
    //     ...bandsModule.resolvers,
    //     ...genresModule.resolvers,
    //     ...tracksModule.resolvers,
    //     ...albumsModule.resolvers
    // }

    const resolverObjects = [
        artistsModule.resolvers,
        bandsModule.resolvers,
        genresModule.resolvers,
        tracksModule.resolvers,
        albumsModule.resolvers
    ]

    const resolvers = mergeResolvers(resolverObjects)

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
                genresAPI: genresModule.genresAPI,
                tracksAPI: tracksModule.tracksAPI,
                albumsAPI: albumsModule.albumsAPI
            }
        },
    })

    return server
}
