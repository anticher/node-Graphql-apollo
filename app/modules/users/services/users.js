import { RESTDataSource } from 'apollo-datasource-rest'
import { config } from 'dotenv'

const url = config().parsed.USERS_URL

export class UsersAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = url
    }

    async getUser(id) {
        return this.get(`/${id}`)
    }

    async getToken(email, password) {
        return this.post('/login', JSON.stringify({email, password}), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    async addUser(input, context) {
        const { userInput } = input
        return this.post('/register', JSON.stringify(userInput), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}
