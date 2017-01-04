import React, { Component } from 'react'

export default class App extends Component {
    render() {
        const { isMobile } = this.props
        return (
            <div>
                <h1>Hello World {isMobile ? 'mobile' : 'desktop'}</h1>
            </div>
        )
    }
}