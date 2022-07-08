export const resolvers = {
    Query: {
        tracks: async (_, { limit, offset }, { dataSources }) => {
            return dataSources.tracksAPI.getTracks(offset, limit)
        },
        track: async (_, { id }, { dataSources }) => {
            return dataSources.tracksAPI.getTrack(id)
        },
    },
    Mutation: {
        addTrack: async (root, args, context) => {
            const result = await context.dataSources.tracksAPI.addTrack(args, context)
            return result
        },
        deleteTrack: async (root, args, context) => {
            const result = await context.dataSources.tracksAPI.deleteTrack(args, context)
            return result
        },
        updateTrack: async (root, args, context) => {
            const result = await context.dataSources.tracksAPI.updateTrack(args, context)
            return result
        },
    },
}
