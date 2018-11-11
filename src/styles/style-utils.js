import { css } from 'styled-components'

const sizes = {
    touch: 824,
    tablet: 1023,
    desktop: 1215,
    widescreen: 1550,
    default: 3000
}

export const media = Object.keys(sizes).reduce((acc, label) => {
    const emSize = sizes[label] / 16
    acc[label] = (...args) => css`
      @media screen and (max-width: ${emSize}em) {
          ${css(...args)};
      }
    `
    return acc
}, {})