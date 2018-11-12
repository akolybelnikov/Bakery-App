import React from "react";
import {Columns, Column, Section} from 'bloomer'

import styled from 'styled-components';

import Offers from '../components/Offers'
import Categories from '../components/Categories'
import News from '../components/News'

const StyledSection = styled(Section)`
    padding: 1rem;
`

const Home = props => {

    return (
        <StyledSection>
            <Columns>
                <Column>
                    <Columns isMultiline>
                        <Column isSize="full">
                            <Offers offers={props.offers}/>
                        </Column>
                        <Column isSize="full">
                            <Categories categories={props.categories}/>
                        </Column>
                    </Columns>
                </Column>
                <Column isSize="1/3">
                    <News news={props.news}/>
                </Column>
            </Columns>
        </StyledSection>
    );

}

export default Home
