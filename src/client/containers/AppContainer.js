import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

class AppContainer extends Component {
  static get propTypes() {
    return {
      client: PropTypes.object.isRequired,
      routes: PropTypes.object.isRequired,
      store: PropTypes.object.isRequired
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { routes, store, client } = this.props
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={routes} />
          </div>
        </Provider>
      </ApolloProvider>
    )
  }
}

export default AppContainer
