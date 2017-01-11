
import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
    <div>
        <h1>GraphQL React Starter</h1>
        <IndexLink to='/' activeClassName='route--active'>Home</IndexLink>
        {' · '}
        <Link to='/users' activeClassName='route--active'>Users</Link>
        {' · '}
        <Link to='/counter' activeClassName='route--active'>Counter</Link>
    </div>
)

export default Header