import React, {PureComponent} from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarBurger,
    NavbarItem,
} from 'bloomer'
import styled from 'styled-components'
import logo from '../assets/logos/logo-sm.png'

const StyledNavbar = styled(Navbar)`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    background-color: transparent;
`
const StyledImage = styled.img`
    width: 130px;
    height: auto;
    max-height: 3.75rem !important;
    margin-left: 1rem;
    @media screen and (max-width: 599px) {
        width: 80px;
    }
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
                    <NavbarItem>
                        <StyledImage src={logo}/>
                    </NavbarItem>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav}/>
                </NavbarBrand>
            </StyledNavbar>
        )
    }

}