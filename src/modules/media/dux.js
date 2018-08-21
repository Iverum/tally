import isArray from 'lodash/isArray'

// ACTION TYPES
export const ADD_MEDIA = 'tally/media/ADD_MEDIA'

// ACTION CREATORS
export const addMedia = taggable => ({
  type: ADD_MEDIA,
  media: taggable
})

// REDUCER
const initialState = {}

function mapById(media = []) {
  const map = {}
  media.forEach((m) => { map[m.id] = m })
  return map
}

function reduceAddFile(state = initialState, action) {
  // TODO handle deduplication
  if (isArray(action.media)) {
    const mappedMedia = mapById(action.media)
    return Object.assign({}, state, mappedMedia)
  }

  return Object.assign({}, state, { [action.media.id]: action.media })
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
