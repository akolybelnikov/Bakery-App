import React from 'react'
import {Section} from 'bloomer'

const News = props => {
    return (
        <Section>{props.news && props
                .news
                .map(news => (
                    <p key={news.id}>{news.content}</p>
                ))}
        </Section>
    )
}

export default News