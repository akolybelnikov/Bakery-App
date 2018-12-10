import React from 'react'
import {Auth} from 'aws-amplify'
import GET_USER from '../GraphQL/Queries/QueryUser'
import {Query} from 'react-apollo'

import {Button, Icon} from 'bloomer'
import StyledContainer from '../components/UI/StyledContainer'
import StyledColumns from '../components/UI/StyledColumns'
import StyledColumn from '../components/UI/StyledColumn'

export default ({username, history, userHasAuthenticated, setUsername}) => {

    const handleSignOut = async() => {
        try {
            await Auth.signOut()
            history.push("/")
            await Auth.signIn(
                process.env.REACT_APP_DEFAULT_USER_EMAIL, process.env.REACT_APP_DEFAULT_USER_PASSWORD
            )
            setUsername(null)
        } catch (e) {
            console.error(e)
        }
        userHasAuthenticated(false)
    }

    return (
        <StyledContainer height="70vh">
            <StyledColumns>
                <StyledColumn>
                <User id={username} />
                <Button isFullWidth isColor="primary" isOutlined onClick={handleSignOut}>Выйдти</Button>
                </StyledColumn>
            </StyledColumns>
        </StyledContainer>
    )
}

const User = ({id}) => {
    return (
        <Query
            query={GET_USER}
            fetchPolicy="cache-first"
            errorPolicy="all"
            variables={{
            id
        }}>
            {({loading, error, data}) => {
                if (loading) 
                    return (<Icon className="fas fa-spinner fa-pulse" isSize="large"/>)
                if (error) {
                    console.error(error)
                    return null
                }
                if (data) {
                    return (
                        <span>{data.getUser.id}</span>
                    )
                }
            }}
        </Query>
    )
}