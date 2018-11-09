import React, {PureComponent, Fragment} from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarEnd,
    Image,
    Field,
    Control,
    Icon,
    Input,
    Button
} from 'bloomer'
import styled from 'styled-components'
import logo from '../assets/logos/logo-sm.png'
import MediaQuery from 'react-responsive';

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
const HeaderControl = styled(Control)`
    span.icon {
        color: ${props => props.theme.success}!important;
        transition: all 1s ease-in-out;
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
                    <StyledNavbarItem isHidden="desktop">
                        <Field>
                            <HeaderControl hasIcons="left">
                                <MediaQuery minDeviceWidth={736}>
                                    {(matches) => {
                                        if (matches) {
                                            return (
                                                <Fragment>
                                                    <Input
                                                        placeholder="поиск по сайту"
                                                        type="text"
                                                        isColor="success"
                                                        isSize="large"/>
                                                    <Icon isSize='large' isAlign='left' className="fas fa-search"></Icon>
                                                </Fragment>
                                            )
                                        } else {
                                            return (
                                                <Fragment>
                                                    <Input
                                                        placeholder="поиск по сайту"
                                                        type="text"
                                                        isColor="success"
                                                        isSize="small"/>
                                                    <Icon isSize='small' isAlign='left' className="fas fa-search"></Icon>
                                                </Fragment>
                                            )
                                        }
                                    }}
                                </MediaQuery>
                            </HeaderControl>
                        </Field>
                    </StyledNavbarItem>
                    <StyledNavbarItem isHidden="desktop">
                        {!this.state.isActive && <MediaQuery minDeviceWidth={736}>
                            {(matches) => {
                                if (matches) {
                                    return (
                                        <Fragment>
                                            <Button isSize="large" onClick={this.onClickNav}>
                                                <Icon className="fas fa-bars"></Icon>
                                            </Button>
                                        </Fragment>
                                    )
                                } else {
                                    return (
                                        <Fragment>
                                            <Button isSize="small" onClick={this.onClickNav}>
                                                <Icon className="fas fa-bars"></Icon>
                                            </Button>
                                        </Fragment>
                                    )
                                }
                            }}
                        </MediaQuery>
}
                        {this.state.isActive && <MediaQuery minDeviceWidth={736}>
                            {(matches) => {
                                if (matches) {
                                    return (
                                        <Fragment>
                                            <Button isSize="large" onClick={this.onClickNav}>
                                                <Icon className="fas fa-times"></Icon>
                                            </Button>
                                        </Fragment>
                                    )
                                } else {
                                    return (
                                        <Fragment>
                                            <Button isSize="small" onClick={this.onClickNav}>
                                                <Icon className="fas fa-times"></Icon>
                                            </Button>
                                        </Fragment>
                                    )
                                }
                            }}
                        </MediaQuery>
}
                    </StyledNavbarItem>
                </NavbarBrand>
                <NavbarEnd>
                    <NavbarItem isHidden="touch">
                        <Field>
                            <HeaderControl hasIcons="left">
                                <Input
                                    placeholder="поиск по сайту"
                                    type="text"
                                    isColor="success"
                                    isSize="large"/>
                                <Icon isSize='large' isAlign='left' className="fas fa-search"></Icon>
                            </HeaderControl>
                        </Field>
                    </NavbarItem>
                </NavbarEnd>
            </StyledNavbar>
        )
    }

}