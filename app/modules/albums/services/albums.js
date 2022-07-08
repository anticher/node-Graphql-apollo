import { RESTDataSource } from 'apollo-datasource-rest'

export class AlbumsAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3005/v1/albums'
    }

    async getAlbums(limit, offset) {
        const response = await this.get(`?offset=${offset}&limit=${limit}`)
        const resultArr = []
        for (const key in response.items) {
            resultArr.push(response.items[key])
        }
        return resultArr
    }

    async getAlbum(id) {
        return this.get(`/${id}`)
    }

    async addAlbum(input, context) {
        const authToken = context.authToken
        const { albumInput } = input
        if (albumInput.bands && albumInput.bands.length > 0) {
            albumInput.bandsIds = await context.dataSources.bandsAPI.addBandsAndGetIds(albumInput, context)
        }
        if (albumInput.artists && albumInput.artists.length > 0) {
            albumInput.artistsIds = await context.dataSources.artistsAPI.addArtistsAndGetIds(albumInput, context)
        }
        if (albumInput.genres && albumInput.genres.length > 0) {
            albumInput.genresIds = await context.dataSources.genresAPI.addGenresAndGetIds(albumInput, context)
        }
        if (albumInput.tracks && albumInput.tracks.length > 0) {
            albumInput.trackIds = await context.dataSources.tracksAPI.addTracksAndGetIds(albumInput, context)
        }
        return this.post('', JSON.stringify(albumInput), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }

    async deleteAlbum(args, context) {
        const authToken = context.authToken
        const { id } = args
        return this.delete(
            `${id}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
            },
        )
    }

    async updateAlbum(input, context) {
        const authToken = context.authToken
        const { albumInput } = input
        if (albumInput.bands.length > 0) {
            albumInput.bandsIds = await context.dataSources.bandsAPI.addBandsAndGetIds(albumInput, context)
        }
        const { _id, ...rest } = albumInput
        return this.put(`${_id}`, JSON.stringify(rest), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }
}
