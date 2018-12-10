import React, {PureComponent, Fragment} from 'react'
import {Auth} from 'aws-amplify'

import {
    Notification,
    Tabs,
    TabList,
    Tab,
    TabLink,
    Card,
    CardContent,
    Field
} from 'bloomer'
import StyledContainer from '../components/UI/StyledContainer'
import StyledColumns from '../components/UI/StyledColumns'
import StyledColumn from '../components/UI/StyledColumn'
import Login from '../components/Authenticate/Login'
import Signup from '../components/Authenticate/Signup'
import Confirm from '../components/Authenticate/Confirm'
import ConfirmationModal from '../components/Authenticate/ConfirmationModal'
import {handleError} from '../lib/awsErrorHelper'

import styled from 'styled-components'

const Error = styled(Notification)`
    min-height: 20%;
    margin-block-start: 20px;
`

class Authenticate extends PureComponent {

    state = {
        busy: false,
        error: null,
        email: null,
        password: null,
        attribute: 'password',
        signup: true,
        confirm: false,
        username: null,
        id: null,
        modalIsActive: false,
        message: null,
        hasCode: false
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
                    error: handleError(e.code)
                })
            }
        }
    }

    onFormChange = (values) => {
        this.setState({
            email: values.email
                ? values.email
                : null,
            password: values.password
                ? values.password
                : null
        })
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

    onEmailConfirm = id => {
        this.setState({confirm: true, id: id})
    }

    onModalOpen = (message) => {
        this.setState({modalActive: true, message: message})
    }

    onModalClose = () => {
        this.setState({modalActive: false, message: null})
    }

    onSuccessfulCodeConfirmation = () => {
        this.setState({confirm: false, signup: false, code: null, id: null})
    }

    render() {
        return (
            <StyledContainer height="auto">
                <StyledColumns>
                    <StyledColumn>
                        <Tabs isBoxed isFullWidth>
                            <TabList>
                                <Tab isActive={this.state.signup}>
                                    <TabLink onClick={this.onToggleSignup}>Регистрация</TabLink>
                                </Tab>
                                <Tab isActive={!this.state.signup}>
                                    <TabLink onClick={this.onToggleLogin}>Вход</TabLink>
                                </Tab>
                            </TabList>
                        </Tabs>
                        <Card>
                            <CardContent>
                                {this.state.signup
                                    ? this.state.confirm
                                        ? <Fragment>
                                                <Field className="has-text-left">
                                                    <p className="is-size-7-mobile">Введите код подтверждения</p>
                                                </Field>
                                                <Confirm
                                                    id={this.state.id}
                                                    hasCode={this.state.hasCode}
                                                    success={this.onSuccessfulCodeConfirmation}
                                                    onModalOpen={this.onModalOpen}/>
                                            </Fragment>
                                        : <Fragment>
                                                <Field className="has-text-left">
                                                    <p className="is-size-7-mobile">Регистрация нового пользователя</p>
                                                </Field>
                                                <Signup
                                                    onEmailConfirm={this.onEmailConfirm}
                                                    attribute={this.state.attribute}
                                                    onAttributeToggle={this.onAttributeToggle}/>
                                            </Fragment>
                                    : <Fragment>
                                        <Field className="has-text-left">
                                            <p className="is-size-7-mobile">Вход для зарегистририванных пользователей</p>
                                        </Field>
                                        <Login
                                            busy={this.state.busy}
                                            attribute={this.state.attribute}
                                            onAttributeToggle={this.onAttributeToggle}
                                            onFormChange={this.onFormChange}
                                            handleSignIn={this.handleSignIn}/>
                                    </Fragment>}
                            </CardContent>
                        </Card>
                        {this.state.error && <Error hasTextAlign="centered" isColor="warning">{this.state.error}</Error>}
                    </StyledColumn>
                </StyledColumns>
                <ConfirmationModal
                    isActive={this.state.modalIsActive}
                    message={this.state.message}
                    onModalClose={this.onModalClose}/>
            </StyledContainer>
        )
    }
}

export default Authenticate