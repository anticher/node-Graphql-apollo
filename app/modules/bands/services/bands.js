import { RESTDataSource } from 'apollo-datasource-rest'

export class BandsAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3003/v1/bands'
    }

    async getBands(limit, offset) {
        const response = await this.get(`?offset=${offset}&limit=${limit}`)
        const resultArr = []
        for (const key in response.items) {
            resultArr.push(response.items[key])
        }
        return resultArr
    }

    async getBand(id) {
        return this.get(`/${id}`)
    }

    async addBand(input, context) {
        const authToken = context.authToken
        const { bandInput } = input
        return this.post('', JSON.stringify(bandInput), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }

    async deleteBand(args, context) {
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

    async updateBand(input, context) {
        const authToken = context.authToken
        const { bandInput } = input
        const { _id, ...rest } = bandInput
        return this.put(`${_id}`, JSON.stringify(rest), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }
}
