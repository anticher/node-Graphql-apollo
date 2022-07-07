import { BandsAPI } from './services/bands.js'

import { resolvers } from './resolvers/bands.js'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'

export async function main() {
    const typeDefs = await loadSchema('app/modules/bands/schemas/bands.graphql', {
        loaders: [new GraphQLFileLoader()],
    })
    return {typeDefs, resolvers, bandsAPI: new BandsAPI()}
}
