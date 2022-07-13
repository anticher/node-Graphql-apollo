import { ApolloServer, gql } from 'apollo-server'

import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

import { main as getUsersModule } from './modules/users/main.js'

import { main as getArtistsModule } from './modules/artists/main.js'

import { main as getBandsModule } from './modules/bands/main.js'

import { main as getGenresModule } from './modules/genres/main.js'

import { main as getTracksModule } from './modules/tracks/main.js'

import { main as getAlbumsModule } from './modules/albums/main.js'

import { main as getFavouritesModule } from './modules/favourites/main.js'

export async function main() {
    const artistsModule = await getArtistsModule()
    const bandsModule = await getBandsModule()
    const genresModule = await getGenresModule()
    const tracksModule = await getTracksModule()
    const albumsModule = await getAlbumsModule()
    const favouritesModule = await getFavouritesModule()
    const usersModule = await getUsersModule()

    const types = [
        usersModule.typeDefs,
        artistsModule.typeDefs,
        bandsModule.typeDefs,
        genresModule.typeDefs,
        tracksModule.typeDefs,
        albumsModule.typeDefs,
        favouritesModule.typeDefs
    ]


    const typeDefs = mergeTypeDefs(types)

    const resolverObjects = [
        usersModule.resolvers,
        artistsModule.resolvers,
        bandsModule.resolvers,
        genresModule.resolvers,
        tracksModule.resolvers,
        albumsModule.resolvers,
        favouritesModule.resolvers
    ]

    const resolvers = mergeResolvers(resolverObjects)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        context: ({ req }) => {
            const authToken = req.headers.authorization || ''
            return { authToken }
        },
        dataSources: () => {
            return {
                usersAPI: usersModule.usersAPI,
                artistsAPI: artistsModule.artistsAPI,
                bandsAPI: bandsModule.bandsAPI,
                genresAPI: genresModule.genresAPI,
                tracksAPI: tracksModule.tracksAPI,
                albumsAPI: albumsModule.albumsAPI,
                favouritesAPI: favouritesModule.favouritesAPI
            }
        },
    })

    return server
}
