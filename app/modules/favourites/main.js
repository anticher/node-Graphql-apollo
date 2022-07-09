import { FavouritesAPI } from './services/favourites.js'

import { resolvers } from './resolvers/favourites.js'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'

export async function main() {
    const typeDefs = await loadSchema('app/modules/favourites/schemas/favourites.graphql', {
        loaders: [new GraphQLFileLoader()],
    })
    return {typeDefs, resolvers, favouritesAPI: new FavouritesAPI()}
}
