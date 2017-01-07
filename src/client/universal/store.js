import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers
} from 'redux'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import { routerMiddleware, routerReducer } from 'react-router-redux'

import reducers from './reducers'

const initialState = {}

// logs redux events in browser console
// TODO: disable on production
// https://github.com/evgenyrodionov/redux-logger
const logger = createLogger()

// allows you to use `push` `replace` `go`
// https://github.com/reactjs/react-router-redux
const router = routerMiddleware(browserHistory)

// Add the react-router-redux reducer to your store on the `routing` key
const rootReducer = combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
}))

export default compose(
    applyMiddleware(logger, router)
)(createStore)(rootReducer, initialState)