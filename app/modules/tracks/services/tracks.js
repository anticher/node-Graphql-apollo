import { RESTDataSource } from 'apollo-datasource-rest'

export class TracksAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3006/v1/tracks'
    }

    async getTracks(limit, offset) {
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
        const { _id, ...rest } = trackInput
        return this.put(`${_id}`, JSON.stringify(rest), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }
}
