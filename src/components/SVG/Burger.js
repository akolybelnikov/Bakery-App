import React from 'react'
import styled from 'styled-components'

const BurgerIconSvg = styled.svg `
    width: 60px;
    height: 60px;
    @media screen and (min-width: 415px) {
    width: 80px;
    height: 80px;
    }
`
const BurgerIconTopBar = styled.path `
    stroke-width: 20;
    stroke-linecap: round;
    stroke: ${props => props.theme.primary};
    fill: none;
    transition: all 0.5s ease-in-out;
    stroke-dasharray: 240px 910px;
`
const BurgerIconMiddleBar = styled.path `
    stroke-width: 20;
    stroke-linecap: round;
    stroke: ${props => props.theme.primary};
    fill: none;
    transition: all 0.5s ease-in-out;
`
const BurgerIconBottomBar = styled.path `
    stroke-width: 20;
    stroke-linecap: round;
    stroke: ${props => props.theme.primary};
    fill: none;
    transition: all 0.5s ease-in-out;
    stroke-dasharray: 240px 910px;
`

const Burger = props => {

    let arrayMiddle = props.isActive
        ? '0px 220px'
        : '240px 240px'
    let offsetTopBottom = props.isActive
        ? '-650px'
        : 0
    let offsetMiddle = props.isActive
        ? '-120px'
        : '0'

    return (
        <BurgerIconSvg viewBox="0 0 800 600" onClick={props.onClickBurger}>
            <BurgerIconTopBar
                style={{
                strokeDashoffset: offsetTopBottom
            }}
                d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"/>

            <BurgerIconMiddleBar
                id="burger-icon-middlebar"
                style={{
                strokeDasharray: arrayMiddle,
                strokeDashoffset: offsetMiddle
            }}
                d="M300,320 L540,320"/>

            <BurgerIconBottomBar
                id="burger-icon-bottombar"
                style={{
                strokeDashoffset: offsetTopBottom
            }}
                d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                transform="translate(480, 320) scale(1, -1) translate(-480, -318)"/>
        </BurgerIconSvg>
    )

}

export default Burger
