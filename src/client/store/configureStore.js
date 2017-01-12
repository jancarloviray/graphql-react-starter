import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { apolloMiddleware } from '../lib/apolloClient'

import { updateLocation } from './location'
import makeRootReducer from './reducers'

export default (initialState = {}) => {
  const enhancers = []
  const middleware = [apolloMiddleware, thunk]

  let composeEnhancers = compose

  if (__DEV__) {
    // logs redux events in browser console
    const logger = createLogger({
      duration: true,
      collapsed: false,
      diff: true,
    })

    middleware.push(logger)

    // https://github.com/zalmoxisus/redux-devtools-extension
    if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // if there’s an exception in reducers, show the error message
        // and don't dispatch next action
        shouldCatchErrors: true,
        actionBlacklist: [],
      })
    }
  }

  // compose store enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  )

  // instantiate store
  const store = createStore(
    makeRootReducer(),
    initialState,
    enhancer
  )

  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  // enable hot loading on reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
