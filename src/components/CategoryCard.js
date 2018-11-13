import React from 'react'
import {Card, CardImage, CardFooter, CardFooterItem} from 'bloomer'
import ProgressiveImage from "react-progressive-bg-image";

import styled, {keyframes} from 'styled-components';
const zoomIn = keyframes `
    from {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
        opacity: 1;
    }
    }
`
const StyledProgressiveImage = styled(ProgressiveImage)`
  background-size: cover;
  background-position: center center;
  transition: all 1.5s linear;
  max-width: 100%;
  height: 100%;
  width: 100%;
`;

const StyledCard = styled(Card)`
    min-height: 100%;
    animation: 1s ${zoomIn} ease-in-out;
    :hover {
        transform: scale(1.1);
        transition: all 0.5s ease;
    }
    cursor: pointer;
`
const CategoryCard = props => {
    const {image, size, title} = props
    return (
        <StyledCard>
            <CardImage hasTextAlign="centered">
                <figure className="image is-square">
                    <StyledProgressiveImage
                        className="bg-image"
                        placeholder={`${process.env.REACT_APP_IMAGEHANDLER_URL}/15x15/${image}`}
                        src={`${process.env.REACT_APP_IMAGEHANDLER_URL}/${size}/smart/filters:watermark(https://s3.amazonaws.com/vse-bulochki-uploads/watermark_logo.png)/${image}`}
                        component="img"/>
                </figure>
            </CardImage>
            <CardFooter hasTextAlign="centered">
                <CardFooterItem>{title}</CardFooterItem>
            </CardFooter>
        </StyledCard>
    )
}

export default CategoryCard