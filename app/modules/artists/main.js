import { ArtistsAPI } from './services/artists.js'

import { resolvers } from './resolvers/artists.js'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'

export async function main() {
    const typeDefs = await loadSchema('app/modules/artists/schemas/artists.graphql', {
        loaders: [new GraphQLFileLoader()],
    })
    return {typeDefs, resolvers, artistsAPI: new ArtistsAPI()}
}
