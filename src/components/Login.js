import React, { Component, Fragment } from "react"
import { Form, Text } from 'informed'
import {
    Field,
    Label,
    Control,
    Button
} from 'bloomer'
import { Auth } from "aws-amplify";
import Client from 'aws-appsync'
import gql from "graphql-tag";
import { Query } from "react-apollo";

class Login extends Component {

    state = {
        busy: false,
        isAuthenticated: false,
        isAuthenticating: false
    }

    async componentDidMount() {
        try {
            const jwt = async() => (await Auth.currentSession()).getAccessToken().getJwtToken()
            if (jwt) this.userHasAuthenticated(true)
        } catch (e) {
            console.error(e)
        }
    }

    handleClick = async (event) => {
        const { values } = this.formApi.getState()
        event.preventDefault()

        try {
            await Auth.signIn(values.email, values.password)
        } catch (e) {
            console.log(e)
        }
    }

    setFormApi = (formApi) => {
        this.formApi = formApi
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    handleLogout = event => {
        this.userHasAuthenticated(false);
    }

    render() {
        return (
            <Fragment>
                <Form getApi={this.setFormApi}>
                    <Field>
                        <Label htmlFor="state-email">Email</Label>
                        <Control>
                            <Text field="email" id="state-email" placeholder='email' />
                        </Control>
                    </Field>
                    <Field>
                        <Label htmlFor="state-password">Password</Label>
                        <Control>
                            <Text field="password" id="state-password" placeholder='password' />
                        </Control>
                    </Field>
                </Form>
                <Button onClick={this.handleClick}>Submit</Button>
                {this.state.isAuthenticated
                    ? <Users/>
                    : <div><span>not authenticated</span></div>
                }
            </Fragment>
        );
    }
}

export default Login

const authenticatedClient = new Client({
    url: process.env.REACT_APP_AWS_APPSYNC_USERS_GRAPHQLENDPOINT,
    region: process.env.REACT_APP_AWS_APPSYNC_USERS_REGION,
    auth: {
        type: process.env.REACT_APP_AWS_APPSYNC_USERS_AUTHENTICATIONTYPE,
        jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
    },
    complexObjectsCredentials: () => Auth.currentCredentials(),
    disableOffline: true,
})

const GET_USERS = gql`
    query {
        listUserTables {
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
                            {data.listUserTables.items.map(user => {
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