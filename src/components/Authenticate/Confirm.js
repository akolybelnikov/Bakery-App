import React, {Fragment, PureComponent} from 'react'
import {Mutation} from 'react-apollo'
import {Auth} from 'aws-amplify'
import {Form, Text} from 'informed'
import {
    Level,
    LevelItem,
    Field,
    Button,
    Icon,
    Control,
    Message,
    MessageBody,
    MessageHeader,
    Delete
} from 'bloomer'

import {handleError} from '../../lib/awsErrorHelper'
import UPDATE_USER from '../../GraphQL/Mutations/UpdateUser'

import styled from 'styled-components'

const Box = styled(LevelItem)`
    max-width: 15%;
`
const Bar = styled(Level)`
    max-width: 90%;
`

function * range(start, end) {
    for (let i = start; i < end; i++) {
        yield i
    }
}

const withMutation = (Component) => {
    return function MutationHOC(props) {
        return <Mutation mutation={UPDATE_USER}>
            {(mutate, state) => <Component {...props} mutate={mutate} loading={state.loading}/>}
        </Mutation>
    }
}

// onRepeatedCodeRequest, onSendRepeatedCodeRequest

const Confirm = withMutation(class extends PureComponent {

    state = {
        busy: false,
        requestCode: false
    }

    onSendCodeConfirmation = async(values) => {
        if (values[0] && values[1] && values[2] && values[3] && values[4] && values[5]) {
            const code = `${values[0]}${values[1]}${values[2]}${values[3]}${values[4]}${values[5]}`

            try {
                const data = await Auth.confirmSignUp(this.props.id, code)
                console.info(data)
                this.props.onModalOpen(
                    'Пользователь успешно зарегистрирован. Вы можете войти в приложение с указанными при регистрации адресом электронной почты и паролем'
                )
                this.props.success()
            } catch (e) {
                console.error(e)
            }
        }
    }

    onRepeatedCodeRequest = async () => {
        await Auth.resendSignUp(this.props.id)
    }

    onSendRepeatedCodeRequest = (values) => {
        Auth.resendSignUp()
        console.log(values.email, this.state.code)
    }

    render() {
        return (
            <Fragment>
                {!this.state.busy && <Fragment>
                    {!this.state.requestCode && <Form onSubmit={this.onSendCodeConfirmation}>
                        {({formState}) => (
                            <Fragment>
                                <Bar isMobile="true">
                                    {[...range(0, 6)].map((_, index) => (
                                        <Box key={index}><Text
                                            field={`${index}`}
                                            id={index}
                                            type="number"
                                            className="input"
                                            maxLength="1"/></Box>
                                    ))}
                                </Bar>
                                <Field>
                                    <Button isColor="primary" isOutlined isFullWidth type="submit">Отправить</Button>
                                </Field>
                                <Field>
                                    <span className="is-size-7-mobile has-text-info">Код утерян?</span>
                                    <Button
                                        isInverted
                                        onClick={this.onRepeatedCodeRequest}
                                        className="is-size-7-mobile">Запросить код подтверждения повторно</Button>
                                </Field>
                            </Fragment>
                        )}
                    </Form>}
                    {this.state.requestCode && <Form onSubmit={this.onSendRepeatedCodeRequest}>
                        {({formState}) => (
                            <Fragment>
                                <Field className="has-text-left">
                                    <p className="is-size-7-mobile">Адрес электронной почты использованный при регистрации</p>
                                </Field>
                                <Field>
                                    <Control>
                                        <Text field="email" id="email" placeholder='email' className="input"/>
                                    </Control>
                                </Field>
                                <Field>
                                    <Button isColor="primary" isOutlined isFullWidth type="submit">Отправить</Button>
                                </Field>
                            </Fragment>
                        )}
                    </Form>}
                </Fragment>}
                {this.state.busy && <div><Icon className="fas fa-spinner fa-pulse" isSize="large"/></div>}
            </Fragment>
        )
    }

})

export default Confirm