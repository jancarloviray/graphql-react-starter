// Routing References:
// https://github.com/ReactTraining/react-router/blob/master/docs/Introduction.md
// https://github.com/ReactTraining/react-router/blob/master/docs/API.md
// Overview: https://github.com/ReactTraining/react-router/tree/master/docs/guides
// Route Configuration: https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md
// Route Matching: https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteMatching.md
// Histories: https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md
// Index Routes: https://github.com/ReactTraining/react-router/blob/master/docs/guides/IndexRoutes.md
// Dynamic Routing: https://github.com/ReactTraining/react-router/blob/master/docs/guides/DynamicRouting.md
// Confirming Navigation: https://github.com/ReactTraining/react-router/blob/master/docs/guides/ConfirmingNavigation.md

// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import UsersRoute from './Users'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    UsersRoute(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes