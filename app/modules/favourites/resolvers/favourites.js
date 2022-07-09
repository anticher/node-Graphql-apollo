export const resolvers = {
    Query: {
        favourites: async (_, { }, { dataSources }) => {
            return dataSources.favouritesAPI.getFavourites()
        },
    },
    Mutation: {
        addFavourite: async (root, args, context) => {
            const result = await context.dataSources.favouritesAPI.addFavourite(args, context)
            return result
        },
        deleteFavourite: async (root, args, context) => {
            const result = await context.dataSources.favouritesAPI.deleteFavourite(args, context)
            return result
        }
    },
}
