import { ArtistsAPI } from './service.js'

import { resolvers } from './resolvers.js'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'

export async function main() {
    const typeDefs = await loadSchema('app/modules/artists/schema.graphql', {
        loaders: [new GraphQLFileLoader()],
    })
    return {typeDefs, resolvers, artistsAPI: new ArtistsAPI()}
}
