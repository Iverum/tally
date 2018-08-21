import isArray from 'lodash/isArray'

// ACTION TYPES
export const ADD_MEDIA = 'tally/media/ADD_MEDIA'

// ACTION CREATORS
export const addMedia = taggable => ({ // TODO document
  type: ADD_MEDIA,
  media: taggable
})

// REDUCER
const initialState = []

function reduceAddFile(state = initialState, action) {
  // TODO handle deduplication
  if (isArray(action.media)) {
    return state.concat(action.media)
  }

  return state.concat([action.media])
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEDIA: {
      return reduceAddFile(state, action)
    }

    default:
      return state
  }
}
