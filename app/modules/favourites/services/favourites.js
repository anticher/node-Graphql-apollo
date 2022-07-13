import { RESTDataSource } from 'apollo-datasource-rest'
import { config } from 'dotenv'

const url = config().parsed.FAVOURITES_URL

export class FavouritesAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = url
    }

    async getFavourites(context) {
        const authToken = context.authToken
        const response = await this.get(
            '',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
            },
        )
        return response
    }

    async addToFavourites(type, id, context) {
        const authToken = context.authToken
        return await this.put('/add', JSON.stringify({ type, id }), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }
}
