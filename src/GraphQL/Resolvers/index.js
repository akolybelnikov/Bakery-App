import { graphql } from 'react-apollo'
import QueryAllOffers from '../Queries/QueryAllOffers'
import QueryAllCategories from '../Queries/QueryAllCategories'
import QueryAllNews from '../Queries/QueryAllNews'
import QueryAllProducts from '../Queries/QueryAllProducts'
import QueryAllFillings from '../Queries/QueryAllFillings'

export const listOffers = graphql(QueryAllOffers, {
    options: ({ refetch }) => ({
        errorPolicy: 'all',
        fetchPolicy: refetch ? 'cache-and-network' : 'cache-first',
    }),
    props: ({
        data: {
            listOffers = {
                items: []
            }
        }
    }) => ({ offers: listOffers.items })

})

export const listCategories = graphql(QueryAllCategories, {
    options: ({ refetch }) => ({
        errorPolicy: 'all',
        fetchPolicy: refetch ? 'cache-and-network' : 'cache-first',
    }),
    props: ({
        data: {
            listCategories = {
                items: []
            }
        }
    }) => ({ categories: listCategories.items })

})

export const listNews = graphql(QueryAllNews, {
    options: ({ refetch }) => ({
        errorPolicy: 'all',
        fetchPolicy: refetch ? 'cache-and-network' : 'cache-first',
    }),
    props: ({
        data: {
            listNews = {
                items: []
            }
        }
    }) => ({ news: listNews.items })

})

export const listProducts = graphql(QueryAllProducts, {
    options: {
        errorPolicy: 'all',
        fetchPolicy: refetch ? 'cache-and-network' : 'cache-first',
    },
    props: ({
        data: {
            listProducts = {
                items: []
            }
        }
    }) => ({ products: listProducts.items })

})

export const listFillings = graphql(QueryAllFillings, {
    options: ({ refetch }) => ({
        errorPolicy: 'all',
        fetchPolicy: refetch ? 'cache-and-network' : 'cache-first',
    }),
    props: ({
        data: {
            listFillings = {
                items: []
            }
        }
    }) => ({ fillings: listFillings.items })

})