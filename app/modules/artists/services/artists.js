import { RESTDataSource } from 'apollo-datasource-rest'
import { config } from 'dotenv'

const url = config().parsed.ARTISTS_URL

export class ArtistsAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = url
    }

    async getArtists(limit = '15', offset = '0') {
        const response = await this.get(`?offset=${offset}&limit=${limit}`)
        const resultArr = []
        for (const key in response.items) {
            resultArr.push(response.items[key])
        }
        return resultArr
    }

    async getArtist(id) {
        return this.get(`/${id}`)
    }

    async addArtist(input, context) {
        const authToken = context.authToken
        const { artistInput } = input
        return this.post('', JSON.stringify(artistInput), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }

    async deleteArtist(args, context) {
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

    async updateArtist(input, context) {
        const authToken = context.authToken
        const { artistInput } = input
        const { id: _id, ...rest } = artistInput
        return this.put(`${_id}`, JSON.stringify(rest), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }
}
