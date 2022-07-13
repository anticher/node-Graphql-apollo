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
            if (!genresIds || genresIds.length < 1) {
                return []
            }
            const promises = genresIds.map((id) => {
                return dataSources.genresAPI.getGenre(id)
            })
            const genres = []
            await Promise.all(promises).then((results) => {
                results.forEach((res) => genres.push(res))
            })
            return genres
        },
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
