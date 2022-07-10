import { RESTDataSource } from 'apollo-datasource-rest'
import { config } from 'dotenv'

const url = config().parsed.TRACKS_URL

export class TracksAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = url
    }

    async getTracks(limit = '15', offset = '0') {
        const response = await this.get(`?offset=${offset}&limit=${limit}`)
        const resultArr = []
        for (const key in response.items) {
            resultArr.push(response.items[key])
        }
        return resultArr
    }

    async getTrack(id) {
        return this.get(`/${id}`)
    }

    async addTrack(input, context) {
        const authToken = context.authToken
        const { trackInput } = input
        return this.post('', JSON.stringify(trackInput), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }

    async deleteTrack(args, context) {
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

    async updateTrack(input, context) {
        const authToken = context.authToken
        const { trackInput } = input
        const { id: _id, ...rest } = trackInput
        return this.put(`${_id}`, JSON.stringify(rest), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }
}
