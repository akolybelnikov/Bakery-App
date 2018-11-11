import graphql from 'graphql-tag'

export default graphql(`
query {
    listOffers (filter: {status: {eq: "active"}}) {
        items {
            id
            content
            image
            createdAt
        }
    }
}
`)