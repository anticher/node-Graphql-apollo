export const resolvers = {
    Query: {
        albums: async (_, { limit, offset }, { dataSources }) => {
            return dataSources.albumsAPI.getAlbums(offset, limit)
        },
        album: async (_, { id }, { dataSources }) => {
            return dataSources.albumsAPI.getAlbum(id)
        },
    },
    Mutation: {
        addAlbum: async (root, args, context) => {
            const result = await context.dataSources.albumsAPI.addAlbum(args, context)
            return result
        },
        deleteAlbum: async (root, args, context) => {
            const result = await context.dataSources.albumsAPI.deleteAlbum(args, context)
            return result
        },
        updateAlbum: async (root, args, context) => {
            const result = await context.dataSources.albumsAPI.updateAlbum(args, context)
            return result
        },
    },
}
