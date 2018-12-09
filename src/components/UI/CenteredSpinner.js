import React from 'react'
import {Icon} from 'bloomer'
import styled from 'styled-components'

const StyledContainer = styled.div `
    margin: 20px auto;
    text-align: center;
`

export default() => 
    <StyledContainer>
        <Icon className="fas fa-spinner fa-pulse" isSize="large"/>
    </StyledContainer>
