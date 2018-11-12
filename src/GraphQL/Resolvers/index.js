import {graphql} from 'react-apollo'
import QueryAllOffers from '../Queries/QueryAllOffers'
import QueryAllCategories from '../Queries/QueryAllCategories'
import QueryAllNews from '../Queries/QueryAllNews'
import QueryAllProducts from '../Queries/QueryAllProducts'

export const listOffers = graphql(QueryAllOffers, {
    options: {
        errorPolicy: 'all'
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
        errorPolicy: 'all'
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
        errorPolicy: 'all'
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
        errorPolicy: 'all'
    },
    props: ({
        data: {
            listProducts = {
                items: []
            }
        }
    }) => ({products: listProducts.items})

})