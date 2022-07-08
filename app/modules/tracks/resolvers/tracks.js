export const resolvers = {
    Query: {
        tracks: async (root, { limit, offset }, { dataSources }) => {
            return dataSources.tracksAPI.getTracks(offset, limit)
        },
        track: async (root, { id }, { dataSources }) => {
            const response = await dataSources.tracksAPI.getTrack(id)
            return response
        },
    },
    Track: {
        // bandsIds: async (root, args, { dataSources }) => {
        //     const response = await dataSources.bandsAPI.getBands()
        //     const result = []
        //     response.forEach(band => {
        //         result.push(band._id)
        //     })
        //     return result
        // },
        // artistsIds: async (root, args, { dataSources }) => {
        //     const response = await dataSources.artistsAPI.getArtists('15', '0')
        //     const result = []
        //     response.forEach(artist => {
        //         result.push(artist._id)
        //     })
        //     return result
        // },
        // genresIds: async (root, args, { dataSources }) => {
        //     const response = await dataSources.genresAPI.getGenres('15', '0')
        //     const result = []
        //     response.forEach(genre => {
        //         result.push(genre._id)
        //     })
        //     return result
        // },
    },
    Mutation: {
        addTrack: async (root, args, context) => {
            const result = await context.dataSources.tracksAPI.addTrack(
                args,
                context,
            )
            return result
        },
        deleteTrack: async (root, args, context) => {
            const result = await context.dataSources.tracksAPI.deleteTrack(
                args,
                context,
            )
            return result
        },
        updateTrack: async (root, args, context) => {
            const result = await context.dataSources.tracksAPI.updateTrack(
                args,
                context,
            )
            return result
        },
    },
}
