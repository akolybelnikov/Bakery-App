import React from 'react'
import {Card, CardImage, CardFooter, CardFooterItem} from 'bloomer'
import ProgressiveImage from "react-progressive-bg-image";

import {media} from '../styles/style-utils'
import styled from 'styled-components';

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
`

const CategoryCard = props => {
    const {image, size, title} = props
    return (
        <StyledCard>
            <CardImage hasTextAlign="centered">
                <StyledProgressiveImage
                    className="bg-image"
                    placeholder={`${process.env.REACT_APP_IMAGEHANDLER_URL}/15x15/${image}`}
                    src={`${process.env.REACT_APP_IMAGEHANDLER_URL}/${size}/smart/filters:watermark(https://s3.amazonaws.com/vse-bulochki-uploads/watermark_logo.png)/${image}`}
                    component="img"
                />
            </CardImage>
            <CardFooter hasTextAlign="centered">
                <CardFooterItem>{title}</CardFooterItem>
            </CardFooter>
        </StyledCard>
    )
}

export default CategoryCard