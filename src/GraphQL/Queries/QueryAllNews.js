import graphql from 'graphql-tag'

export default graphql(`
query {
    listNews (filter: {status: {eq: "active"}}) {
        items {
            id
            content
            image
            createdAt
            status
        }
    }
}
`)