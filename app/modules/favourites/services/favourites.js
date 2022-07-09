import { RESTDataSource } from 'apollo-datasource-rest'

export class FavouritesAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3007/v1/favourites'
    }

    async getFavourites(context) {
        const authToken = context.authToken
        const response = await this.get('', {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        })
        // const resultArr = []
        // for (const key in response.items) {
        //     resultArr.push(response.items[key])
        // }
        // console.log(resultArr)
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
