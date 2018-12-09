import React from 'react'
import {Column} from 'bloomer'
import styled from 'styled-components'

const CenteredColum = styled(Column)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledColumn = props => {
    return <CenteredColum
        hasTextAlign="centered"
        isOffset={{
        tablet: 2,
        desktop: 3
    }}
        isSize={{
        mobile: 12,
        tablet: 8,
        desktop: 6
    }}>{props.children}</CenteredColum>
}

export default StyledColumn