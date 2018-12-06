import { graphql } from 'react-apollo'
import QueryAllOffers from '../Queries/QueryAllOffers'
import QueryAllCategories from '../Queries/QueryAllCategories'
import QueryAllNews from '../Queries/QueryAllNews'
import QueryAllProducts from '../Queries/QueryAllProducts'
import QueryAllFillings from '../Queries/QueryAllFillings'

export const listOffers = graphql(QueryAllOffers, {
    options: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
    },
    props: ({
        data: {
            listOffers = {
                items: []
            }
        }
    }) => ({ offers: listOffers.items })

})

export const listCategories = graphql(QueryAllCategories, {
    options: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
    },
    props: ({
        data: {
            listCategories = {
                items: []
            }
        }
    }) => ({ categories: listCategories.items })

})

export const listNews = graphql(QueryAllNews, {
    options: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
    },
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
        fetchPolicy: 'cache-and-network',
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
    options: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
    },
    props: ({
        data: {
            listFillings = {
                items: []
            }
        }
    }) => ({ fillings: listFillings.items })

})