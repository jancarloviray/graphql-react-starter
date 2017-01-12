// Constant
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

// Action
export function locationChange(location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  }
}

// Action Creator
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

// Reducer
const initialState = null
export default function locationReducer(state = initialState, action) {
  return action.type === LOCATION_CHANGE ? action.payload : state
}