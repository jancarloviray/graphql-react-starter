import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/Users'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the Users:   */

import Users from '../components/Users'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const USERS_QUERY = gql`
query {
    users {
        userId
        name
        accounts {
            accountId
            type
            total
        }
    }
}
`

const createUser = gql`
mutation createUser($name: String!){
  createUser(name: $name)
},
`

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:
    import { createSelector } from 'reselect'
    const Users = (state) => state.users
    const tripleCount = createSelector(users, (count) => count * 3)
    const mapStateToProps = (state) => ({
      users: tripleCount(state)
    })
    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default compose(
  graphql(USERS_QUERY, {
    // too aggressive, but just for demonstration
    options: { pollInterval: 5000 }
  }),
  graphql(createUser, {
    props: ({ mutate }) => ({
      createUser: (name) => mutate({ variables: { name } })
    })
  }),
  connect(null, mapDispatchToProps)
)(Users)
