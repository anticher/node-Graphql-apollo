export const resolvers = {
    Query: {
        user: async (_, { id }, { dataSources }) => {
            return dataSources.usersAPI.getUser(id)
        },
        jwt: async (_, { email, password }, { dataSources }) => {
            return dataSources.usersAPI.getToken(email, password)
        },
    },
    User: {
        id: ({ _id }) => _id,
    },
    Mutation: {
        register: async (root, args, context) => {
            const result = await context.dataSources.usersAPI.addUser(args, context)
            return result
        },
    },
}
