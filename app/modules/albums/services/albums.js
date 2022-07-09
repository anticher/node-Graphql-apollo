import { RESTDataSource } from 'apollo-datasource-rest'

export class AlbumsAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3005/v1/albums'
    }

    async getAlbums(limit = '15', offset = '0') {
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
        const { _id, ...rest } = albumInput
        return this.put(`${_id}`, JSON.stringify(rest), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }
}
