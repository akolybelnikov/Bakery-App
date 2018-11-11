import React from 'react'
import {Card, CardImage, CardFooter} from 'bloomer'
import ProgressiveImage from "react-progressive-bg-image";
import styled from 'styled-components';
import { CardFooterItem } from 'bloomer/lib/components/Card/Footer/CardFooterItem';

const StyledProgressiveImage = styled(ProgressiveImage)`
  background-size: cover;
  background-position: center center;
  transition: all 1.5s linear;
  max-width: 100%;
  width: 100%;
  height: 100%;
`;

const CategoryCard = props => {
    const {image, size, title} = props
    return (
        <Card>
            <CardImage hasTextAlign="centered">
                <StyledProgressiveImage
                    placeholder={`${process.env.REACT_APP_IMAGEHANDLER_URL}/15x15/${image}`}
                    src={`${process.env.REACT_APP_IMAGEHANDLER_URL}/${size}/smart/filters:watermark(https://s3.amazonaws.com/vse-bulochki-uploads/watermark_logo.png)/${image}`}
                    component="img"
                />
            </CardImage>
            <CardFooter hasTextAlign="centered">
                <CardFooterItem>{title}</CardFooterItem>
            </CardFooter>
        </Card>
    )
}

export default CategoryCard