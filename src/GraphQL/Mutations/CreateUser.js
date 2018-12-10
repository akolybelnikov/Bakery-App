import gql from 'graphql-tag'

export default gql(`
    mutation($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            email
            status
        }
    }
`)