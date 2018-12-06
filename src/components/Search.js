import React from 'react'
import {
    NavbarItem,
    Field,
    Control,
    Icon,
    Input
} from 'bloomer'
import Responsive from 'react-responsive'

const Desktop = props => <Responsive {...props} minWidth={736}/>
const Touch = props => <Responsive {...props} maxWidth={735}/>

export default SearchBar = props => {
    return (
        <div>
        <Field>
            <HeaderControl hasIcons="left">
                <Desktop>
                    <Input
                        placeholder="поиск по сайту"
                        type="text"
                        isColor="success"
                        isSize="large"/>
                    <Icon isSize='large' isAlign='left' className="fas fa-search"></Icon>
                </Desktop>
                <Touch>
                    <Input
                        placeholder="поиск по сайту"
                        type="text"
                        isColor="success"
                        isSize="small"/>
                    <Icon isSize='small' isAlign='left' className="fas fa-search"></Icon>
                </Touch>
            </HeaderControl>
        </Field>
    </div>
    )

}