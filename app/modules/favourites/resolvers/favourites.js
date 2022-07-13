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
        artists: async (root, args, { dataSources }) => {
            const { artistsIds } = root
            if (!artistsIds || artistsIds.length < 1) {
                return []
            }
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
        tracks: async (root, args, { dataSources }) => {
            const { tracksIds } = root
            if (!tracksIds || tracksIds.length < 1) {
                return []
            }
            const promises = tracksIds.map((id) => {
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
        addTrackToFavourites: async (root, { id }, context) => {
            const result = await context.dataSources.favouritesAPI.addToFavourites('tracks', id, context)
            return result
        },
        addBandToFavourites: async (root, { id }, context) => {
            const result = await context.dataSources.favouritesAPI.addToFavourites('bands', id, context)
            return result
        },
        addArtistToFavourites: async (root, { id }, context) => {
            const result = await context.dataSources.favouritesAPI.addToFavourites('artists', id, context)
            return result
        },
        addGenreToFavourites: async (root, { id }, context) => {
            const result = await context.dataSources.favouritesAPI.addToFavourites('genres', id, context)
            return result
        },
    },
}
