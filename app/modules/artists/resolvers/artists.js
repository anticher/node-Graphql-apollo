export const resolvers = {
    Query: {
        artists: async (_, { limit, offset }, { dataSources }) => {
            return dataSources.artistsAPI.getArtists(offset, limit)
        },
        artist: async (_, { id }, { dataSources }) => {
            return dataSources.artistsAPI.getArtist(id)
        },
    },
    Mutation: {
        addArtist: async (root, args, context) => {
            const result = await context.dataSources.artistsAPI.addArtist(args, context)
            return result
        },
        deleteArtist: async (root, args, context) => {
            const result = await context.dataSources.artistsAPI.deleteArtist(args, context)
            return result
        },
        updateArtist: async (root, args, context) => {
            const result = await context.dataSources.artistsAPI.updateArtist(args, context)
            return result
        },
    },
}
