import React, {PureComponent, Fragment} from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarEnd,
    Image,
    NavbarBurger,
    Control,
    Icon,
    Button
} from 'bloomer'
import styled from 'styled-components'
import logo from '../assets/logos/logo.png'
import Responsive from 'react-responsive'
import Burger from './SVG/Burger'

const Desktop = props => <Responsive {...props} minWidth={736}/>
const Touch = props => <Responsive {...props} maxWidth={735}/>

const StyledNavbar = styled(Navbar)`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    background-color: rgba(255,255,255,.5);
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
    margin-left: auto;
`

export default class Header extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };
    }

    onClickNav = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    render() {
        return (
            <StyledNavbar>
                <NavbarBrand>
                    <NavbarItem isHidden="desktop">
                        <Icon isSize="medium" className="fas fa-user fa-2x"/>
                    </NavbarItem>
                    <NavbarItem>
                        <HeaderImage src={logo}/>
                    </NavbarItem>
                    <BurgerIcon>
                        <Burger isActive={this.state.isActive} onClickNav={this.onClickNav}/>
                    </BurgerIcon>
                </NavbarBrand>
                <NavbarEnd>
                    <NavbarItem isHidden="touch"></NavbarItem>
                </NavbarEnd>
            </StyledNavbar>
        )
    }

}