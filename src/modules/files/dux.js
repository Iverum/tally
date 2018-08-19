// ACTION TYPES
const ADD_FILE = 'tally/files/ADD_NEW_FILE'
const REMOVE_FILE = 'tally/files/REMOVE_FILE'

// ACTION CREATORS
export const addFile = fileName => ({
  type: ADD_FILE,
  fileName
})

export const removeFile = fileName => ({
  type: REMOVE_FILE,
  fileName
})

// REDUCER
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE: {
      // If the file is already in our list we can just return state
      if (state.includes(action.fileName)) {
        return state
      }

      return state.concat([action.fileName])
    }

    case REMOVE_FILE: {
      return state.filter(file => file !== action.fileName)
    }

    default:
      return state
  }
}
