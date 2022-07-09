export const resolvers = {
    Query: {
        favourites: async (_, { }, context) => {
            return context.dataSources.favouritesAPI.getFavourites(context)
        },
    },
    Favourite: {
        id: ({ _id }) => _id,
        bands: async (root, args, { dataSources }) => {
            const { bandsIds } = root
            const promises = bandsIds.map((id) => {
                return dataSources.bandsAPI.getBand(id)
            })
            const bands = []
            await Promise.all(promises).then((results) => {
                results.forEach((res) => bands.push(res))
            })
            return bands
        },
        artists: async (root, args, { dataSources }) => {
            const { artistsIds } = root
            const promises = artistsIds.map((id) => {
                return dataSources.artistsAPI.getArtist(id)
            })
            const artists = []
            await Promise.all(promises).then((results) => {
                results.forEach((res) => artists.push(res))
            })
            return artists
        },
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
        tracks: async (root, args, { dataSources }) => {
            const { trackIds } = root
            const promises = trackIds.map((id) => {
                return dataSources.tracksAPI.getTrack(id)
            })
            const tracks = []
            await Promise.all(promises).then((results) => {
                results.forEach((res) => tracks.push(res))
            })
            return tracks
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
