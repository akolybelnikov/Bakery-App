import React from 'react'
import {Section} from 'bloomer'

const Offers = props => {
    return (
        <Section>
            {props.offers && props
                .offers
                .map(offer => (
                    <p key={offer.id}>{offer.content}</p>
                ))}
        </Section>
    )
}

export default Offers