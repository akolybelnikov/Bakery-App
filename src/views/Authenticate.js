import React, {PureComponent} from 'react'
import {Auth} from 'aws-amplify'

import {Notification, Tabs, TabList, Tab, TabLink} from 'bloomer'
import StyledContainer from '../components/UI/StyledContainer'
import StyledColumns from '../components/UI/StyledColumns'
import StyledColumn from '../components/UI/StyledColumn'
import Login from '../components/Authenticate/Login'
import Signup from '../components/Authenticate/Signup'

class Authenticate extends PureComponent {

    state = {
        busy: false,
        error: null,
        email: null,
        password: null,
        attribute: 'password',
        signup: true
    }

    handleSignIn = async event => {
        event.preventDefault()
        if (this.state.email && this.state.password) {
            this.setState({busy: true, error: null})
            try {
                await Auth.signIn(this.state.email.trim(), this.state.password.trim())
                const info = await Auth.currentUserInfo()
                this
                    .props
                    .setUsername(info.attributes.sub)
                this.setState({busy: false});
                this
                    .props
                    .userHasAuthenticated(true)
            } catch (e) {
                console.warn(e)
                this.setState({
                    busy: false,
                    error: this.handleError(e)
                })
            }
        }
    }

    handleSignUp = async event => {
        event.preventDefault()
        if (this.state.email && this.state.password) {
            this.setState({busy: true, error: null})
            try {
                const signup = await Auth.signUp(this.state.email.trim(), this.state.password.trim())
                console.info(signup)
                // const info = await Auth.currentUserInfo() this     .props
                // .setUsername(info.attributes.sub)
                this.setState({busy: false});
            } catch (e) {
                console.warn(e)
                this.setState({
                    busy: false,
                    error: this.handleError(e)
                })

            }
        }
    }

    handleError = (err) => {
        switch (err.code) {
            case 'UsernameExistsException':
                return 'Пользователь с указанным адресом электронной почты уже существует.'
            case 'NotAuthorizedException':
                return 'Неверное имя пользователя или пароль.'
            case 'UserNotFoundException':
                return 'Пользователь не существует.'
            default:
                return 'Произошла ошибка и мы не смогли получить ваши данные ... Печально.'
        }
    }

    onFormChange = (values) => {
        this.setState({email: values.email, password: values.password})
    }

    onAttributeToggle = () => {
        this.state.attribute === 'password'
            ? this.setState({attribute: 'text'})
            : this.setState({attribute: 'password'})
    }

    onToggleSignup = () => {
        if (this.state.error) 
            this.setState({error: null})
        if (!this.state.signup) 
            this.setState({signup: true})
    }

    onToggleLogin = () => {
        if (this.state.error) 
            this.setState({error: null})
        if (this.state.signup) 
            this.setState({signup: false})
    }

    render() {
        return (
            <StyledContainer height="auto">
                <StyledColumns>
                    <StyledColumn>
                        <Tabs isBoxed isFullWidth>
                            <TabList>
                                <Tab isActive={this.state.signup}>
                                    <TabLink onClick={this.onToggleSignup}>Зарегестрироваться</TabLink>
                                </Tab>
                                <Tab isActive={!this.state.signup}>
                                    <TabLink onClick={this.onToggleLogin}>Войти</TabLink>
                                </Tab>
                            </TabList>
                        </Tabs>
                        {this.state.signup
                            ? <Signup
                                    busy={this.state.busy}
                                    attribute={this.state.attribute}
                                    onAttributeToggle={this.onAttributeToggle}
                                    onFormChange={this.onFormChange}
                                    handleSignUp={this.handleSignUp}/>
                            : <Login
                                busy={this.state.busy}
                                attribute={this.state.attribute}
                                onAttributeToggle={this.onAttributeToggle}
                                onFormChange={this.onFormChange}
                                handleSignIn={this.handleSignIn}/>}
                        <div
                            style={{
                            minHeight: '20vh'
                        }}>
                            {this.state.error && <Notification
                                style={{
                                marginBlockStart: 20
                            }}
                                hasTextAlign="centered"
                                isColor="warning"
                                hasTextColor="white">{this.state.error}</Notification>}
                        </div>
                    </StyledColumn>
                </StyledColumns>
            </StyledContainer>
        )
    }
}

export default Authenticate