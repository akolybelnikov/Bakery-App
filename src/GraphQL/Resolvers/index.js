import {graphql} from 'react-apollo'
import QueryAllOffers from '../Queries/QueryAllOffers'
import QueryAllCategories from '../Queries/QueryAllCategories'
import QueryAllNews from '../Queries/QueryAllNews'
import QueryAllProducts from '../Queries/QueryAllProducts'

export const listOffers = graphql(QueryAllOffers, {
    options: {
        fetchPolicy: 'network-only'
    },
    props: ({
        data: {
            listOffers = {
                items: []
            }
        }
    }) => ({offers: listOffers.items})

})

export const listCategories = graphql(QueryAllCategories, {
    options: {
        fetchPolicy: 'cache-and-network'
    },
    props: ({
        data: {
            listCategories = {
                items: []
            }
        }
    }) => ({categories: listCategories.items})

})

export const listNews = graphql(QueryAllNews, {
    options: {
        fetchPolicy: 'cache-and-network'
    },
    props: ({
        data: {
            listNews = {
                items: []
            }
        }
    }) => ({news: listNews.items})

})

export const listProducts = graphql(QueryAllProducts, {
    options: {
        fetchPolicy: 'cache-and-network'
    },
    props: ({
        data: {
            listProducts = {
                items: []
            }
        }
    }) => ({products: listProducts.items})

})