import React, { Component } from "react"
import { Form, Text } from 'informed'
import {
    Field,
    Label,
    Control,
    Button,
    Modal,
    ModalBackground,
    ModalContent,
    ModalCard,
    ModalCardBody,
    ModalCardFooter,
    ModalCardHeader,
    ModalCardTitle,
    Delete,
    Icon
} from 'bloomer'
import { Auth } from "aws-amplify"
import Client, { createAppSyncLink } from 'aws-appsync'
import gql from "graphql-tag"
import { Query } from "react-apollo"
import styled from 'styled-components'
import { InMemoryCache } from "apollo-cache-inmemory"
import { withClientState } from "apollo-link-state"
import { ApolloLink } from "apollo-link"

const StyledModal = styled(Modal)`
    .modal-card {
        width: auto;
    }
    .modal-card-foot {
        background-color: white;
    }
`
class Login extends Component {

    state = {
        busy: false,
        isAuthenticating: false,
        error: null
    }

    async componentDidMount() {
        try {
            const session = await Auth.currentCredentials()
            console.log(session.authenticated)
        } catch (e) {
            console.error(e)
        }
    }

    handleSignIn = async (event) => {
        const { values } = this.formApi.getState()
        event.preventDefault()

        this.setState({ busy: true });
        try {
            await Auth.signIn(values.email.trim(), values.password.trim())
            this.setState({ busy: false, error: null });
            this.props.onModalClose()
        } catch (e) {
            this.setState({ busy: false, error: e });
        }
    }

    handleSignOut = async () => {
        try {
            await Auth.signOut()
            this.props.validSession(false)
        } catch (e) {
            return e
        }
    }

    setFormApi = (formApi) => {
        this.formApi = formApi
    }

    render() {
        const { isActive, onModalClose, isAuthenticated } = this.props
        return (
            <StyledModal isActive={isActive}>
                <ModalBackground onClick={onModalClose} />
                <ModalContent>
                    {!this.state.busy ? <ModalCard>
                        {!isAuthenticated && !this.state.error && <ModalCardHeader>
                            <ModalCardTitle className="has-text-primary">Войти</ModalCardTitle>
                            <Delete onClick={onModalClose} />
                        </ModalCardHeader>}
                        <ModalCardBody>
                            {this.state.error && <p>{this.state.error}</p>}
                            {!isAuthenticated && !this.state.error && <Form getApi={this.setFormApi}>
                                <Field>
                                    <Label htmlFor="state-email">Адрес эл. почты</Label>
                                    <Control>
                                        <Text field="email" id="state-email" placeholder='email' className="input" />
                                    </Control>
                                </Field>
                                <Field>
                                    <Label htmlFor="state-password">Пароль</Label>
                                    <Control>
                                        <Text field="password" id="state-password" placeholder='password' className="input" />
                                    </Control>
                                </Field>
                            </Form>}
                            {!this.state.error && <ModalCardFooter>
                                <Button isColor="primary" isOutlined isFullWidth isLoading={this.state.busy} onClick={this.handleSignIn}>Войти</Button>
                            </ModalCardFooter>}
                            {isAuthenticated
                                ? <Users />
                                : <div><span>not authenticated</span></div>
                            }
                        </ModalCardBody>
                    </ModalCard> : <Icon className="fas fa-spinner fa-pulse has-text-white" isSize="large" />}
                </ModalContent>
            </StyledModal>
        );
    }
}

export default Login

const authConfig = {
    type: process.env.REACT_APP_AWS_APPSYNC_USERS_AUTHENTICATIONTYPE,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
}

const authenticatedClient = new Client(
    {
        disableOffline: true,
        url: process.env.REACT_APP_AWS_APPSYNC_USERS_GRAPHQLENDPOINT,
        region: process.env.REACT_APP_AWS_APPSYNC_USERS_REGION,
        auth: authConfig,
        complexObjectsCredentials: () => Auth.currentCredentials()
    },
    // {
    //     cache,
    //     link: ApolloLink.from([
    //         stateLink,
    //         createAppSyncLink({
    //             url: process.env.REACT_APP_AWS_APPSYNC_USERS_GRAPHQLENDPOINT,
    //             region: process.env.REACT_APP_AWS_APPSYNC_USERS_REGION,
    //             auth: authConfig,
    //             complexObjectsCredentials: () => Auth.currentCredentials()
    //         })
    //     ])
    // }
)

// const cache = new InMemoryCache();
// const stateLink = withClientState({
//     cache,
//     defaults: {
//         user
//     },
//     resolvers: {
//         Mutation: {
//             addUser: (_, { email }, { cache }) => {
//                 const query = gql`
//                     query getUser {
//                         user @client {
                            
//                         }
//                     }
//                 `
//             }
//         }
//     }
// })

const GET_USERS = gql`
    query {
        listUsers {
          items {
            email
            id
            avatar
            firstname
            lastname
            dob
            phone1
            phone2
            votes
            comments
            products
            orders
            password
            createdAt
          }
        }
    }
  `

const Users = () => {
    return (
        <Query query={GET_USERS} client={authenticatedClient}>
            {({ loading, error, data }) => {
                if (loading) return "Loading..."
                if (error) return `Error! ${error.message}`

                if (data) {
                    return (
                        <div>
                            {data.listUsers.items.map(user => {
                                return (
                                    <p key={user.id}>{user.firstname}</p>
                                )
                            })
                            }
                        </div>
                    )
                }
            }}
        </Query>
    )
}