import gql from 'graphql-tag'

export default gql(`
    mutation($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            email
            status,
            firstname,
            lastname,
            telephone,
            avatar,
            votes,
            dob,
            lastActive
        }
    }
`)