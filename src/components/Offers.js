import React, {Fragment} from 'react'
import {Query} from 'react-apollo'
import LIST_OFFERS from '../GraphQL/Queries/QueryAllOffers'
import CenteredSpinner from './UI/CenteredSpinner'

const Offers = (props) => {
    return (
        <Query query={LIST_OFFERS} fetchPolicy="cache-first" errorPolicy="all">
            {({loading, error, data}) => {
                if (loading) 
                    return <CenteredSpinner/>
                if (error) 
                    return null
                if (data) {
                    return (
                        <Fragment>
                            {data.listOffers.items.length && data
                                .listOffers
                                .items
                                .map(offer => (
                                    <p key={offer.id}>{offer.content}</p>
                                ))}
                        </Fragment>
                    )
                }
            }}
        </Query>
    )
}

export default Offers
