import graphql from 'graphql-tag'

export default graphql(`
query {
    listCategories (filter: {status: {eq: "active"}}) {
        items {
            name
            image
            status
            title
        }
    }
}
`)