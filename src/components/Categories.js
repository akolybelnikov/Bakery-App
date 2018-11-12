import React from 'react'
import CategoryCard from './CategoryCard'
import {Card, CardHeader, CardHeaderTitle, CardContent, Columns, Column, Section} from 'bloomer';
import styled from 'styled-components';
import Responsive from 'react-responsive';

const Default = props => <Responsive {...props} minWidth={1216}/>;
const Desktop = props => <Responsive {...props} minWidth={769} maxWidth={1215}/>;
const Touch = props => <Responsive {...props} maxWidth={768}/>

const StyledTitle = styled(CardHeaderTitle)`
    justify-content: center;
`

const Categories = props => {
    return (
        <Section>
            <Card>
                <CardHeader hasTextAlign="centered">
                    <StyledTitle>Наш Ассортимент</StyledTitle>
                </CardHeader>
                <CardContent>
                    <Columns isCentered>
                        {props.categories && props
                            .categories
                            .map(category => (
                                <Column key={category.name} isSize='1/3'>
                                    <Default>
                                        <CategoryCard size={'400x400'} image={category.image} title={category.title}/>
                                    </Default>
                                    <Desktop>
                                        <CategoryCard size={'300x300'} image={category.image} title={category.title}/>
                                    </Desktop>
                                    <Touch>
                                        <CategoryCard size={'250x250'} image={category.image} title={category.title}/>
                                    </Touch>
                                </Column>
                            ))}
                    </Columns>
                </CardContent>
            </Card>
        </Section>
    )
}

export default Categories