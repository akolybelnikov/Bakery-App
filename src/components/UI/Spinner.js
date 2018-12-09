import React from 'react'
import {Icon} from 'bloomer'
import StyledContainer from './StyledContainer'

const Spinner = () => {
    return (
        <StyledContainer>
            <div><Icon className="fas fa-spinner fa-pulse" isSize="large"/></div>
        </StyledContainer>
    )
}

export default Spinner