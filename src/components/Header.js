import React, {PureComponent} from 'react'
import {NavLink} from "react-router-dom";
import {Auth} from 'aws-amplify'
import Client from 'aws-appsync'
import GET_USER from '../GraphQL/Queries/QueryUser'
import {Query} from 'react-apollo'

import {NavbarBrand, NavbarItem, NavbarEnd, Image, Icon} from 'bloomer'
import styled from 'styled-components'
import logo from '../assets/logos/logo.png'
import Responsive from 'react-responsive'
import Burger from './SVG/Burger'

const Desktop = props => <Responsive {...props} minWidth={736}/>
const Touch = props => <Responsive {...props} maxWidth={735}/>

const StyledNavbar = styled.nav `
    max-width: 1600px;
    margin: 0 auto;
    background-color: rgba(255,255,255,.5);
`
const StyledNavbarBrand = styled(NavbarBrand)`
    justify-content: space-between;
    .navbar-item {
        justify-conent: center;
    }
`
const UserLogin = styled(NavbarItem)`
    span.icon {
        width: 60px !important;
    }
    word-break: break-word;
`
const HeaderImage = styled(Image)`
    height: 80px;
    width: 150px;
    transition: all 1s ease-in-out;
    @media screen and (min-width: 769px) {
        margin-left: 1rem;
    }
    @media screen and (max-width: 825px) {
        height: 70px;
        width: 130px;
    }
    @media screen and (max-width: 599px) {
        height: 60px;
        width: 112.5px;
    }
    @media screen and (max-width: 568px) {
        height: 48px;
        width: 90px;
    }
    @media screen and (max-width: 320px) {
        height: 35px;
        width: 65px;
    }
`
const StyledNavbarItem = styled(NavbarItem)`
    flex-grow: 1;
    justify-content: flex-end;
    span.icon {
        transition: all 1s ease-in-out;
    }
    @media screen and (max-width: 320px) {
        padding: 0.5rem;
    }
`
const BurgerIcon = styled(NavbarItem)`
    cursor: pointer;
`

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.login = React.createRef()

        this.state = {
            isMenuActive: false,
            isLoginActive: false,
            username: null
        };
    }

    async componentDidMount() {
        try {
            const info = await Auth.currentUserInfo()
            console.log(info)
            if (info.attributes.sub !== process.env.REACT_APP_DEFAULT_USERNAME) {
                this
                    .props
                    .userHasAuthenticated(true)
                this.setState({username: info.attributes.sub})
            } else {
                this
                    .props
                    .userHasAuthenticated(false)
            }
        } catch (e) {
            this
                .props
                .userHasAuthenticated(false)
        }
    }

    onClickBurger = () => {
        this.setState({
            isMenuActive: !this.state.isMenuActive
        })
    }

    render() {
        const {isAuthenticated} = this.props
        return (
            <StyledNavbar className="navbar is-fixed-top">
                <StyledNavbarBrand>
                    <NavbarItem>
                        <NavLink to="/"><HeaderImage src={logo}/></NavLink>
                    </NavbarItem>
                    <UserLogin isHidden="desktop">
                        {isAuthenticated
                            ? <NavLink to="/user"><User id={this.state.username}/></NavLink>
                            : <NavLink to="/login">
                                <span className="is-size-7">Вход пользователя</span>
                            </NavLink>
}
                    </UserLogin>
                    <BurgerIcon isHidden="desktop">
                        <Burger isActive={this.state.isMenuActive} onClickBurger={this.onClickBurger}/>
                    </BurgerIcon>
                </StyledNavbarBrand>
                <NavbarEnd>
                    <NavbarItem isHidden="touch"></NavbarItem>
                </NavbarEnd>
            </StyledNavbar>
        )
    }
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
                    return null
                }
                if (data) {
                    if (data.getUser.firstname) {
                        return (
                            <span className="is-size-7 is-capitalized">Здравствуйте, {data.getUser.fisrtname}</span>
                        )
                    } else {
                        return (
                            <span className="is-size-7">{data.getUser.email}</span>
                        )
                    }
                } else 
                    return (<Icon isSize="medium" className="fas fa-user fa-2x"/>)
            }}
        </Query>
    )
}