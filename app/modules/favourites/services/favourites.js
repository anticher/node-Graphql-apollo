import { RESTDataSource } from 'apollo-datasource-rest'

export class FavouritesAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3007/v1/favourites'
    }

    async getFavourites() {
        console.log('h')
        const response = await this.get('')
        console.log(response)
        const resultArr = []
        for (const key in response.items) {
            resultArr.push(response.items[key])
        }
        return resultArr
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
