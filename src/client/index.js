import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import AppContainer from './containers/AppContainer'
import { apolloClient } from './lib/apolloClient'

// instantiate store
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

// render setup
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)
  ReactDOM.render(
    <AppContainer store={store} routes={routes} client={apolloClient} />,
    MOUNT_NODE
  )
}

if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error) // eslint-disable-line
        renderError(error)
      }
    }

    module.hot.accept('./routes/index', () => setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    }))
  }
}

render()
