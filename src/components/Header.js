import React, {PureComponent} from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarBurger,
    NavbarItem,
    NavbarEnd,
    Image,
    Field,
    Control,
    Icon,
    Input
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
const HeaderImage = styled(Image)`
    height: 80px;
    width: 150px;
    @media screen and (min-width: 769px) {
        margin-left: 1rem;
    }
    @media screen and (max-width: 768px) {
        height: 70px;
        width: 130px;
    }
    @media screen and (max-width: 599px) {
        height: 60px;
        width: 112.5px;
    }
    @media screen and (max-width: 320px) {
        height: 35px;
        width: 65px;
    }
`
const StyledNavbarBurger = styled(NavbarBurger)`
    :hover {
        background-color: #fff;
    }
    height: 4.25rem;
    width: 4.25rem;
    @media screen and (max-width: 321px) {
        height: 3.25rem;
        width: 3.25rem;
    }
`
const HeaderControl = styled(Control)`
    span.icon {
        color: ${props => props.theme.success}!important;
    }
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
                        <HeaderImage src={logo}/>
                    </NavbarItem>
                    <NavbarItem isHidden="desktop">
                        <Field>
                            <HeaderControl hasIcons="left">
                                <Input
                                    placeholder="поиск по сайту"
                                    type="text"
                                    isColor="success"
                                    isSize="small"/>
                                <Icon isSize='small' isAlign='left' className="fas fa-search"></Icon>
                            </HeaderControl>
                        </Field>
                    </NavbarItem>
                    <StyledNavbarBurger isActive={this.state.isActive} onClick={this.onClickNav}/>
                </NavbarBrand>
                <NavbarEnd>
                    <NavbarItem isHidden="touch">
                        <Field>
                            <HeaderControl hasIcons="left">
                                <Input
                                    placeholder="поиск по сайту"
                                    type="text"
                                    isColor="success"
                                    isSize="medium"/>
                                <Icon isSize='medium' isAlign='left' className="fas fa-search"></Icon>
                            </HeaderControl>
                        </Field>
                    </NavbarItem>
                </NavbarEnd>
            </StyledNavbar>
        )
    }

}