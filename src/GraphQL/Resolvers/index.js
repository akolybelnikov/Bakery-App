import { graphql } from 'react-apollo'
import QueryAllOffers from '../Queries/QueryAllOffers'
import QueryAllCategories from '../Queries/QueryAllCategories'
import QueryAllNews from '../Queries/QueryAllNews'
import QueryAllProducts from '../Queries/QueryAllProducts'
import QueryAllFillings from '../Queries/QueryAllFillings'

const options = {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first',
}

export const listOffers = graphql(QueryAllOffers, {
    options: options,
    props: ({
        data: {
            listOffers = {
                items: []
            }
        }
    }) => ({ offers: listOffers.items })

})

export const listCategories = graphql(QueryAllCategories, {
    options: options,
    props: ({
        data: {
            listCategories = {
                items: []
            }
        }
    }) => ({ categories: listCategories.items })

})

export const listNews = graphql(QueryAllNews, {
    options: options,
    props: ({
        data: {
            listNews = {
                items: []
            }
        }
    }) => ({ news: listNews.items })

})

export const listProducts = graphql(QueryAllProducts, {
    options: options,
    props: ({
        data: {
            listProducts = {
                items: []
            }
        }
    }) => ({ products: listProducts.items })

})

export const listFillings = graphql(QueryAllFillings, {
    options: options,
    props: ({
        data: {
            listFillings = {
                items: []
            }
        }
    }) => ({ fillings: listFillings.items })

})