export const resolvers = {
    Query: {
        albums: async (_, { limit, offset }, { dataSources }) => {
            return dataSources.albumsAPI.getAlbums(offset, limit)
        },
        album: async (_, { id }, { dataSources }) => {
            return dataSources.albumsAPI.getAlbum(id)
        },
    },
    Album: {
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
        track: async (root, args, { dataSources }) => {
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
    AlbumOut: {
        id: ({ _id }) => _id,
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
