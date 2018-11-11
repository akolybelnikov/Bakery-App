import graphql from 'graphql-tag'

export default graphql(`
query {
    listProducts (limit: 500, filter: {status: {eq: "active"}}) {
        items {
            productId
            category
            attachment
            image
            weight
            price
            sorts
            upvotes
            comments
            productName
            content
            ingridients
            status
            createdAt
            updatedAt
        }
    }
}
`)