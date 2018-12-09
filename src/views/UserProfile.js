import React from 'react'
import {Auth} from 'aws-amplify'
import GET_USER from '../GraphQL/Queries/QueryUser'
import {Query} from 'react-apollo'

import {Button, Icon} from 'bloomer'
import StyledContainer from '../components/UI/StyledContainer'
import StyledColumns from '../components/UI/StyledColumns'
import StyledColumn from '../components/UI/StyledColumn'

export default props => {

    const handleSignOut = async() => {
        try {
            await Auth.signOut()
            props
                .history
                .push("/")
            await Auth.signIn(
                process.env.REACT_APP_DEFAULT_USER_EMAIL, process.env.REACT_APP_DEFAULT_USER_PASSWORD
            )
            props.setUsername(null)
        } catch (e) {
            console.error(e)
        }
        props.userHasAuthenticated(false)
    }

    return (
        <StyledContainer>
            <StyledColumns>
                <StyledColumn>
                    <Button isFullWidth isColor="primary" isOutlined onClick={handleSignOut}>Выйдти</Button>
                </StyledColumn>
            </StyledColumns>
        </StyledContainer>
    )
}

const User = ({email}) => {
    return (
        <Query
            query={GET_USER}
            fetchPolicy="cache-first"
            errorPolicy="all"
            variables={{
            email
        }}>
            {({loading, error, data}) => {
                if (loading) 
                    return (<Icon className="fas fa-spinner fa-pulse" isSize="large"/>)
                if (error) 
                    return console.error(error)
                if (data) {
                    return (
                        <span>{data.getUser.avatar}</span>
                    )
                }
            }}
        </Query>
    )
}