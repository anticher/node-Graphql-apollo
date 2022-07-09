import { RESTDataSource } from 'apollo-datasource-rest'

export class UsersAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3004/v1/users'
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
