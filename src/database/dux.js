import database from './'

// ACTION TYPES
const INITIALIZED = 'tally/database/INITIALIZED'

// ACTION CREATORS
export const markInitialized = () => ({
  type: INITIALIZED
})

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
