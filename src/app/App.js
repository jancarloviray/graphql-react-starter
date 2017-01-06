import React, { Component } from 'react'
import './App.scss'

export default class App extends Component {
    render() {
        const { isMobile } = this.props
        return (
            <div>
                <h1>Hello World</h1>
                <span className="label">
                    {isMobile ? 'mobile' : 'desktop'}
                </span>
            </div>
        )
    }
}