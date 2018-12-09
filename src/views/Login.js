import React, {PureComponent} from 'react'
import {Auth} from 'aws-amplify'

import {Form, Text} from 'informed'
import {
    Field,
    Label,
    Control,
    Button,
    Notification,
    Card,
    CardContent,
    Icon
} from 'bloomer'
import StyledContainer from '../components/UI/StyledContainer'
import StyledColumns from '../components/UI/StyledColumns'
import StyledColumn from '../components/UI/StyledColumn'

class Login extends PureComponent {

    state = {
        busy: false,
        error: null
    }

    handleSignIn = async event => {
        event.preventDefault()
        const {values} = this.formApi.getState()
        this.setState({busy: true, error: null})
        try {
            await Auth.signIn(values.email.trim(), values.password.trim())
            const info = await Auth.currentUserInfo()
            this.props.setUsername(info.attributes.sub)
            this.setState({busy: false});
            this.props.userHasAuthenticated(true)
        } catch (e) {
            this.setState({
                busy: false,
                error: e.message.toString()
            });
        }
    }

    setFormApi = (formApi) => {
        this.formApi = formApi
    }

    render() {
        return (
            <StyledContainer>
                <StyledColumns>
                    <StyledColumn>
                        {!this.state.busy
                            ? <Form getApi={this.setFormApi}>
                                    <Card>
                                        <CardContent>
                                            <Field>
                                                <Label htmlFor="state-email">Адрес эл. почты</Label>
                                                <Control>
                                                    <Text field="email" id="state-email" placeholder='email' className="input"/>
                                                </Control>
                                            </Field>
                                            <Field>
                                                <Label htmlFor="state-password">Пароль</Label>
                                                <Control>
                                                    <Text
                                                        type="password"
                                                        field="password"
                                                        id="state-password"
                                                        placeholder='password'
                                                        className="input"/>
                                                </Control>
                                            </Field>
                                            <Field>
                                                <Button
                                                    isColor="primary"
                                                    isOutlined
                                                    isFullWidth
                                                    isLoading={this.state.busy}
                                                    onClick={this.handleSignIn}>Войти</Button>
                                            </Field>
                                        </CardContent>
                                    </Card>
                                </Form>
                            : <div><Icon className="fas fa-spinner fa-pulse" isSize="large"/></div>
}
                        {this.state.error && <Notification
                            style={{
                            marginBlockStart: 20
                        }}
                            hasTextAlign="centered"
                            isColor="warning"
                            hasTextColor="white">{this.state.error}</Notification>}
                    </StyledColumn>
                </StyledColumns>
            </StyledContainer>
        )
    }
}

export default Login