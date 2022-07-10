export const resolvers = {
    Query: {
        artists: async (_, { limit, offset }, { dataSources }) => {
            return dataSources.artistsAPI.getArtists(offset, limit)
        },
        artist: async (_, { id }, { dataSources }) => {
            return dataSources.artistsAPI.getArtist(id)
        },
    },
    Artist: {
        id: ({ _id }) => _id,
        bands: async (root, args, { dataSources }) => {
            const { bandsIds } = root
            if (!bandsIds || bandsIds.length < 1) {
                return []
            }
            const promises = bandsIds.map((id) => {
                return dataSources.bandsAPI.getBand(id)
            })
            const bands = []
            await Promise.all(promises).then((results) => {
                results.forEach((res) => bands.push(res))
            })
            return bands
        },
    },
    ArtistOut: {
        id: ({ _id }) => _id,
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
