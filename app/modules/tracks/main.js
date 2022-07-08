import { TracksAPI } from './services/tracks.js'

import { resolvers } from './resolvers/tracks.js'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'

export async function main() {
    const typeDefs = await loadSchema('app/modules/tracks/schemas/tracks.graphql', {
        loaders: [new GraphQLFileLoader()],
    })
    return {typeDefs, resolvers, tracksAPI: new TracksAPI()}
}
