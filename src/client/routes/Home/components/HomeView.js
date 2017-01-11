import React from 'react'
import ReduxLogoImage from '../assets/redux-logo.png'
import GraphQLLogoImage from '../assets/graphql-logo.svg'
import './HomeView.scss'

export const HomeView = () => (
    <div>
        <img
            alt='GraphQL Logo'
            className='logo'
            style={{ width: 200, height: 100 }}
            src={GraphQLLogoImage} />
        <img
            alt='Redux Logo'
            className='logo'
            style={{ width: 200 }}
            src={ReduxLogoImage} />
    </div>
)

export default HomeView