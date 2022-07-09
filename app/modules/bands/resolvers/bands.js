export const resolvers = {
    Query: {
        bands: async (_, { limit, offset }, { dataSources }) => {
            return dataSources.bandsAPI.getBands(offset, limit)
        },
        band: async (_, { id }, { dataSources }) => {
            return dataSources.bandsAPI.getBand(id)
        },
    },
    Band: {
        id: ({ _id }) => _id,
        genres: async (root, args, { dataSources }) => {
            const { genresIds } = root
            const promises = genresIds.map((id) => {
                return dataSources.genresAPI.getGenre(id)
            })
            const genres = []
            await Promise.all(promises).then((results) => {
                results.forEach((res) => genres.push(res))
            })
            return genres
        },
        // members: async (root, args, { dataSources }) => {
        //     const { membersId } = root
        //     const promises = membersId.map((id) => {
        //         return dataSources.artistsAPI.getArtist(id)
        //     })
        //     const members = []
        //     await Promise.all(promises).then((results) => {
        //         results.forEach((res) => members.push(res))
        //     })
        //     return members
        // },
    },
    BandOut: {
        id: ({ _id }) => _id,
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
