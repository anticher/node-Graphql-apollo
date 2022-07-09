export const resolvers = {
    Query: {
        genres: async (_, { limit, offset }, { dataSources }) => {
            return dataSources.genresAPI.getGenres(offset, limit)
        },
        genre: async (_, { id }, { dataSources }) => {
            return dataSources.genresAPI.getGenre(id)
        },
    },
    Genre: {
        id: ({ _id }) => _id,
    },
    GenreOut: {
        id: ({ _id }) => _id,
    },
    Mutation: {
        addGenre: async (root, args, context) => {
            const result = await context.dataSources.genresAPI.addGenre(args, context)
            return result
        },
        deleteGenre: async (root, args, context) => {
            const result = await context.dataSources.genresAPI.deleteGenre(args, context)
            return result
        },
        updateGenre: async (root, args, context) => {
            const result = await context.dataSources.genresAPI.updateGenre(args, context)
            return result
        },
    },
}
