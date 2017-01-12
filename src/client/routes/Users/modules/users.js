// Constants
export const USERS_INCREMENT = 'USERS_INCREMENT'
export const USERS_DOUBLE_ASYNC = 'USERS_DOUBLE_ASYNC'

// Actions
export function increment(value = 1) {
  return {
    type: USERS_INCREMENT,
    payload: value
  }
}

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: USERS_DOUBLE_ASYNC,
          payload: getState().users
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync
}

// Action Handlers
const ACTION_HANDLERS = {
  [USERS_INCREMENT]: (state, action) => state + action.payload,
  [USERS_DOUBLE_ASYNC]: (state) => state * 2
}

// Reducer
const initialState = 0
export default function usersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
