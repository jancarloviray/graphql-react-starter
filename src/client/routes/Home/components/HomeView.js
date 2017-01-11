import React from 'react'
import ReduxLogo from '../assets/redux-logo.png'
import ReactLogo from '../assets/react-logo.png'
import GraphQLLogo from '../assets/graphql-logo.svg'
import css from './HomeView.scss'

export const HomeView = () => (
    <div className={css.container}>
        <img
            alt='GraphQL Logo'
            className={css.logo}
            src={ReactLogo} />
        <img
            alt='GraphQL Logo'
            className={css.logo}
            src={GraphQLLogo} />
        <img
            alt='Redux Logo'
            className={css.logo}
            src={ReduxLogo} />
    </div>
)

export default HomeView