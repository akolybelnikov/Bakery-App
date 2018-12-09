import React from 'react'
import { Container} from 'bloomer'
import styled from 'styled-components'

const FullScreenContainer = styled(Container)`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledContainer = props => {
    return <FullScreenContainer style={{height: `${props.height}`}} isDisplay="flex">{props.children}</FullScreenContainer>
}

export default StyledContainer