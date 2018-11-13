import React from 'react'
import CategoryCard from './CategoryCard'
import {
    Card,
    CardHeader,
    CardHeaderTitle,
    CardContent,
    Columns,
    Column,
    Section
} from 'bloomer'
import styled from 'styled-components'
import Responsive from 'react-responsive'

const Widescreen = props => <Responsive {...props} minWidth={1920}/>;
const Desktop = props => <Responsive {...props} minWidth={1280} maxWidth={1919}/>
const Tablet = props => <Responsive {...props} minWidth={960} maxWidth={1279}/>

const HandsetSmall = props => <Responsive {...props} maxWidth={359}/>
const Handset = props => <Responsive {...props} minDeviceWidth={360} maxWidth={599}/>

const HandsetPortrait = props => <Responsive {...props} minWidth={0} maxWidth={767} orientation="portrait"/>
const HandsetLandscape = props => <Responsive {...props} minWidth={560} maxWidth={959} orientation="landscape"/>
const TouchPortrait = props => <Responsive {...props} minWidth={600} maxWidth={959} orientation="portrait"/>

const LargeScreens = props => <Responsive {...props} minWidth={960}/>

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
                    <HandsetPortrait>
                        <Columns isCentered>
                            {props.categories && props
                                .categories
                                .map(category => (
                                    <React.Fragment key={category.name}>
                                        <HandsetSmall>
                                            <Column key={category.name} isSize='1/3'>
                                                <CategoryCard size={'250x250'} image={category.image} title={category.title}/>
                                            </Column>
                                        </HandsetSmall>
                                        <Handset>
                                            <Column key={category.name} isSize='1/3'>
                                                <CategoryCard size={'350x350'} image={category.image} title={category.title}/>
                                            </Column>
                                        </Handset>
                                    </React.Fragment>
                                ))}
                        </Columns>
                    </HandsetPortrait>
                    <HandsetLandscape>
                        <Columns isCentered isMobile>
                            {props.categories && props
                                .categories
                                .map(category => (
                                    <Column key={category.name} isSize='1/3'>
                                        <CategoryCard size={'200x200'} image={category.image} title={category.title}/>
                                    </Column>
                                ))}
                        </Columns>
                    </HandsetLandscape>
                    <TouchPortrait>
                        <Columns isCentered isMobile>
                            {props.categories && props
                                .categories
                                .map(category => (
                                    <Column key={category.name} isSize='1/3'>
                                        <CategoryCard size={'250x250'} image={category.image} title={category.title}/>
                                    </Column>
                                ))}
                        </Columns>
                    </TouchPortrait>
                    <LargeScreens>
                        <Columns isCentered>
                            {props.categories && props
                                .categories
                                .map(category => (
                                    <Column key={category.name} isSize='1/3'>
                                        <Widescreen>
                                            <CategoryCard size={'600x600'} image={category.image} title={category.title}/>
                                        </Widescreen>
                                        <Desktop>
                                            <CategoryCard size={'300x300'} image={category.image} title={category.title}/>
                                        </Desktop>
                                        <Tablet>
                                            <CategoryCard size={'200x200'} image={category.image} title={category.title}/>
                                        </Tablet>
                                    </Column>
                                ))}
                        </Columns>
                    </LargeScreens>
                </CardContent>
            </Card>
        </Section>
    )
}

export default Categories