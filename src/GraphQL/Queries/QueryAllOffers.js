import gql from 'graphql-tag'

export default gql(`
query {
    listOffers (filter: {status: {eq: "active"}}) {
        items {
            id
            content
            image
            status
        }
    }
}
`)