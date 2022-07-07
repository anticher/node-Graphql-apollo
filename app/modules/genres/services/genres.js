import { RESTDataSource } from 'apollo-datasource-rest'

export class GenresAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3001/v1/genres'
    }

    async getGenres(limit, offset) {
        const response = await this.get(`?offset=${offset}&limit=${limit}`)
        const resultArr = []
        for (const key in response.items) {
            resultArr.push(response.items[key])
        }
        return resultArr
    }

    async getGenre(id) {
        return this.get(`/${id}`)
    }

    async addGenre(input, context) {
        const authToken = context.authToken
        const { genreInput } = input
        return this.post('', JSON.stringify(genreInput), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }

    async deleteGenre(args, context) {
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

    async updateGenre(input, context) {
        const authToken = context.authToken
        const { genreInput } = input
        const { _id, ...rest } = genreInput
        return this.put(`${_id}`, JSON.stringify(rest), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }
}
