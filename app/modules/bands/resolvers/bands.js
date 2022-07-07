export const resolvers = {
    Query: {
        bands: async (_, { limit, offset }, { dataSources }) => {
            return dataSources.bandsAPI.getBands(offset, limit)
        },
        band: async (_, { id }, { dataSources }) => {
            return dataSources.bandsAPI.getBand(id)
        },
    },
    Mutation: {
        addBand: async (root, args, context) => {
            const result = await context.dataSources.bandsAPI.addBand(args, context)
            return result
        },
        deleteBand: async (root, args, context) => {
            const result = await context.dataSources.bandsAPI.deleteBand(args, context)
            return result
        },
        updateBand: async (root, args, context) => {
            const result = await context.dataSources.bandsAPI.updateBand(args, context)
            return result
        },
    },
}
