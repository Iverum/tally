import database from './'

// ACTION TYPES
const INITIALIZED = 'tally/database/INITIALIZED'

// ACTION CREATORS
const markInitialized = () => ({
  type: INITIALIZED
})

export const initialize = () => (dispatch) => {
  database.sync()
    .then(() => dispatch(markInitialized()))
}

// REDUCER
const initialState = {
  ready: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED: {
      return { ready: true }
    }

    default:
      return state
  }
}
