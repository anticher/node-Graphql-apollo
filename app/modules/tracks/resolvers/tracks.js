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
        album: async (root, args, { dataSources }) => {
            const { albumId } = root
            const response = await dataSources.albumsAPI.getAlbum(albumId)
            return response
        },
    },
    TrackOut: {
        id: ({ _id }) => _id,
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
