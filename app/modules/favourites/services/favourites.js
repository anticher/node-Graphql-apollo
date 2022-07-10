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
        const response = await this.get('', {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
        return response
    }

    async addFavourite(input, context) {
        const authToken = context.authToken
        const { favouriteInput } = input
        return await this.put('/add', JSON.stringify(favouriteInput), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
    }

    async deleteFavourite(input, context) {
        const authToken = context.authToken
        const { favouriteInput } = input
        return await this.put(
            '/remove',
            JSON.stringify(favouriteInput),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
            },
        )
    }
}
