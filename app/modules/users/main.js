import { UsersAPI } from './services/users.js'

import { resolvers } from './resolvers/users.js'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'

export async function main() {
    const typeDefs = await loadSchema('app/modules/users/schemas/users.graphql', {
        loaders: [new GraphQLFileLoader()],
    })
    return {typeDefs, resolvers, usersAPI: new UsersAPI()}
}
