import React, { Fragment } from 'react'
import { Form, Text } from 'informed'
import { Level, LevelItem, Field, Button, Icon } from 'bloomer'

import styled from 'styled-components'

const Box = styled(LevelItem)`
    max-width: 15%;
`
const Bar = styled(Level)`
    max-width: 90%;
`

function* range(start, end) {
    for (let i = start; i < end; i++) {
        yield i
    }
}

const Confirm = props => {
    const { onFormChange, onHandleSubmit, busy } = props
    return (
        !busy ? <Fragment>
            <Form onChange={formState => onFormChange(formState.values)}>
                <Bar isMobile="true">
                    {[...range(0, 6)].map((_, index) => (
                        <Box key={index}><Text field={`${index}`} id={index} type="number" className="input" /></Box>
                    ))}
                </Bar>
                <Field>
                    <Button isColor="primary" isOutlined isFullWidth onClick={onHandleSubmit}>Отправить</Button>
                </Field>
            </Form>
        </Fragment> : <div><Icon className="fas fa-spinner fa-pulse" isSize="large" /></div>
    )

}

export default Confirm