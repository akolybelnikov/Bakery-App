import React from 'react'
import { Columns} from 'bloomer'
import styled from 'styled-components'

const FullHeightContainer = styled(Columns)`
  height: 100%;
  width: 100%;
`

const StyledColumns = props => {
    return <FullHeightContainer isMultiline isVCentered>{props.children}</FullHeightContainer>
}

export default StyledColumns