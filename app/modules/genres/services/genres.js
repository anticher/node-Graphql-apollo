import { RESTDataSource } from 'apollo-datasource-rest'
import { config } from 'dotenv'

const url = config().parsed.GENRES_URL

export class GenresAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = url
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

    async addGenresAndGetIds(input, context) {
        const promises = input.genres.map((genre) => {
            const object = { genreInput: genre }
            return context.dataSources.genresAPI.addGenre(object, context)
        })
        const ids = []
        await Promise.all(promises).then((results) => {
            results.forEach((res) => ids.push(res._id))
        })
        return ids
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
        const { id: _id, ...rest } = genreInput
        return this.put(`${_id}`, JSON.stringify(rest), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }
}
