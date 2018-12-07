import React, { PureComponent } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarEnd,
    Image,
    Control,
    Icon
} from 'bloomer'
import styled from 'styled-components'
import logo from '../assets/logos/logo.png'
import Responsive from 'react-responsive'
import Burger from './SVG/Burger'
import Login from './Login'

const Desktop = props => <Responsive {...props} minWidth={736} />
const Touch = props => <Responsive {...props} maxWidth={735} />

const StyledNavbar = styled(Navbar)`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
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
const HeaderControl = styled(Control)`
    span.icon {
        color: ${props => props.theme.success}!important;
        transition: all 1s ease-in-out;
    }
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
        };
    }

    onClickBurger = () => {
        this.setState({
            isMenuActive: !this.state.isMenuActive
        })
    }

    onClickLogin = () => {
        this.setState({
            isLoginActive: !this.state.isLoginActive
        })
    }

    onSignOut = () => {
        this.login.current.handleSignOut()
    }

    render() {
        const { isAuthenticated } = this.props
        return (
            <StyledNavbar>
                <StyledNavbarBrand>
                    <UserLogin isHidden="desktop">
                        {!isAuthenticated
                            ? <Icon isSize="medium" className="fas fa-sign-in-alt fa-2x" onClick={this.onClickLogin} />
                            : <Icon isSize="medium" className="fas fa-sign-out-alt fa-2x" onClick={this.onSignOut} />}
                        <Login isActive={this.state.isLoginActive} onModalClose={this.onClickLogin} ref={this.login} isAuthenticated={isAuthenticated} />
                    </UserLogin>
                    <NavbarItem>
                        <HeaderImage src={logo} />
                    </NavbarItem>
                    <BurgerIcon isHidden="desktop">
                        <Burger isActive={this.state.isMenuActive} onClickBurger={this.onClickBurger} />
                    </BurgerIcon>
                </StyledNavbarBrand>
                <NavbarEnd>
                    <NavbarItem isHidden="touch"></NavbarItem>
                </NavbarEnd>
            </StyledNavbar>
        )
    }

}