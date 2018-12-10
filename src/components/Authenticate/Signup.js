import React, { Fragment, PureComponent } from 'react'
import { Mutation, Query } from 'react-apollo'
import { Auth } from 'aws-amplify'
import { Form, Text } from 'informed'
import {
    Field,
    Label,
    Control,
    Button,
    Icon,
    Notification
} from 'bloomer'
import { handleError } from '../../lib/awsErrorHelper'
import { EMAIL_REGEX, PASSWORD_REGEX, EMAIL_INVALID_ERROR, PASSWORD_INVALID_ERROR } from '../../lib/regex'
import CREATE_USER from '../../GraphQL/Mutations/CreateUser'
import styled from 'styled-components'

const Error = styled(Notification)`
    min-height: 20%;
    margin-block-start: 20px;
`

const StyledIcon = styled.i`
    pointer-events: all;
    cursor: pointer;
`

const FormError = styled.p`
    min-height: 10px;
`

const withMutation = (FormComponent) => {
    return function MutationHOC(props) {
        return <Mutation mutation={CREATE_USER}>
            {(mutate, response) => <FormComponent {...props} mutate={mutate} response={response} />}
        </Mutation>
    }
}

const SignUp = withMutation(
    class extends PureComponent {
        state = {
            busy: false,
            error: null
        }

        handleSignUp = async (values) => {
            if (values.email && values.password) {
                try {
                    const signup = await Auth.signUp(values.email.trim(), values.password.trim())
                    console.info(signup)
                    try {
                        const mutation = await this.props.mutate({
                            variables: {
                                input: {
                                    id: signup.userSub,
                                    email: values.email,
                                    status: 'NOT_CONFIRMED'
                                }
                            }
                        })
                        console.info(mutation)
                    } catch (e) {
                        console.warn(e)
                    }
                } catch (e) {
                    console.warn(e)
                    this.setState({ error: handleError(e.code) })
                }
            }
        }

        validateEmail = value => {
            return !value || !EMAIL_REGEX.test(value) ? EMAIL_INVALID_ERROR : null
        }

        validatePassword = value => {
            return !value || !PASSWORD_REGEX.test(value) ? PASSWORD_INVALID_ERROR : null
        }

        render() {
            return (
                <Fragment>
                    {!this.state.busy && <Form onSubmit={this.handleSignUp}>
                        {({ formState }) => (
                            <Fragment>
                                <Field>
                                    <Label htmlFor="state-email">Адрес эл. почты</Label>
                                    <Control>
                                        <Text
                                            validate={this.validateEmail}
                                            validateOnBlur
                                            field="email"
                                            id="state-email"
                                            placeholder='email'
                                            className="input" />
                                    </Control>
                                    <FormError className="has-text-left is-size-7-mobile has-text-warning">{formState.errors.email && formState.errors.email}</FormError>
                                </Field>
                                <Field>
                                    <Label htmlFor="state-password">Пароль</Label>
                                    <p className="has-text-left is-size-7-mobile has-text-info" htmlFor="state-password">
                                        Пароль должен содержать:<br></br> - не менее 1 строчной буквы<br></br> - не менее 1 заглавной буквы<br></br>- не менее 1 цифры<br></br>- не менее 1 специального символа (!, @, #, $, %, ^, &)<br></br>- не менее восьми знаков
                                    </p>
                                    <Control className="has-icons-right">
                                        <Text
                                            validate={this.validatePassword}
                                            validateOnBlur
                                            type={this.props.attribute}
                                            field="password"
                                            id="state-password"
                                            placeholder='password'
                                            className="input" />
                                        <span onClick={this.props.onAttributeToggle} className="icon has-text-primary is-right">
                                            <StyledIcon className="fas fa-eye" />
                                        </span>
                                    </Control>
                                    <FormError className="has-text-left is-size-7-mobile has-text-warning">{formState.errors.password && formState.errors.password}</FormError>
                                </Field>
                                <Field>
                                    <Button isColor="primary" type="submit" isOutlined isFullWidth>Отправить</Button>
                                </Field>
                            </Fragment>
                        )}
                    </Form>}
                    {this.state.busy && <div><Icon className="fas fa-spinner fa-pulse" isSize="large" /></div>}
                    {this.state.error && <Error hasTextAlign="centered" isColor="warning">{this.state.error}</Error>}
                </Fragment>
            )
        }
    }
)

export default SignUp