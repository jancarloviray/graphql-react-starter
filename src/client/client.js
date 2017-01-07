
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './universal/store'
import createRoutes from './universal/createRoutes'

const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(history)

const rootInstance = render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
)

// https://github.com/webpack/docs/wiki/hot-module-replacement
// https://github.com/gaearon/react-hot-loader/blob/master/docs/README.md
if (process.env.NODE_ENV === 'development' && module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances() {
            return [rootInstance]
        },
    })
}
