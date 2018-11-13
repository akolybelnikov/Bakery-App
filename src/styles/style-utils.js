import { css } from 'styled-components'

const sizes = {
    handset: 599,
    touch: 959,
    tablet: 1279,
    desktop: 1919,
    widescreen: 5000
}

const minSizes = {
    handset: 600,
    touch: 960,
    tablet: 1280,
    desktop: 1920
}

export const maxMedia = Object.keys(sizes).reduce((acc, label) => {
    const emSize = sizes[label] / 16
    acc[label] = (...args) => css`
      @media screen and (max-width: ${emSize}em) {
          ${css(...args)};
      }
    `
    return acc
}, {})

export const minMedia = Object.keys(minSizes).reduce((acc, label) => {
    const emSize = minSizes[label] / 16
    acc[label] = (...args) => css`
      @media screen and (min-width: ${emSize}em) {
          ${css(...args)};
      }
    `
    return acc
}, {})