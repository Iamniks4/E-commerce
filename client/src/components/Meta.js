import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
        <meta name='keywords' content={keywords}></meta>
      </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to MH - 29',
    keywords: 'Spare parts, buys spare parts, cheap spare parts',
    description: 'we sell the best auto mobile spare parts for cheap'
}

export default Meta
