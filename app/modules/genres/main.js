import { GenresAPI } from './services/genres.js'

import { resolvers } from './resolvers/genres.js'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'

export async function main() {
    const typeDefs = await loadSchema('app/modules/genres/schemas/genres.graphql', {
        loaders: [new GraphQLFileLoader()],
    })
    return {typeDefs, resolvers, genresAPI: new GenresAPI()}
}
