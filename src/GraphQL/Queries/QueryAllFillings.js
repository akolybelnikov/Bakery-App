import graphql from 'graphql-tag'

export default graphql(`
query {
    listFillings {
        items {
            name
            image
            label
        }
    }
}
`)