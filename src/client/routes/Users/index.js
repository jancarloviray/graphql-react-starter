
import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'users',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Users = require('./containers/UsersContainer').default
      const reducer = require('./modules/Users').default

      /*  Add the reducer to the store on key 'users'  */
      injectReducer(store, { key: 'users', reducer })

      /*  Return getComponent   */
      cb(null, Users)

      /* Webpack named bundle   */
    }, 'users')
  }
})
