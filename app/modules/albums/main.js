import { AlbumsAPI } from './services/albums.js'
import { resolvers } from './resolvers/albums.js'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'

export async function main() {
    const typeDefs = await loadSchema('app/modules/albums/schemas/albums.graphql', {
        loaders: [new GraphQLFileLoader()],
    })
    return {typeDefs, resolvers, albumsAPI: new AlbumsAPI()}
}
