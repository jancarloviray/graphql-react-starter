import React, { Component } from 'react'
import css from './App.scss'

export default class App extends Component {
    render() {
        const { isMobile } = this.props
        return (
            <div>
                <h1>Hello World</h1>
                <span className={css.label}>
                    {isMobile ? 'mobile' : 'desktop'}
                </span>
            </div>
        )
    }
}