import isArray from 'lodash/isArray'

// ACTION TYPES
export const ADD_TAGGABLE = 'tally/media/ADD_TAGGABLE'
export const ADD_TAG = 'tally/media/ADD_TAG'

// ACTION CREATORS
export const addMedia = taggable => ({
  media: taggable,
  type: ADD_TAGGABLE
})

// REDUCER
const initialState = {
  taggables: {},
  tags: {}
}

function mapById(media = []) {
  const map = {}
  media.forEach((m) => { map[m.id] = m })
  return map
}

function reduceAddFile(state = initialState, action) {
  // TODO handle deduplication
  if (isArray(action.media)) {
    const mappedMedia = mapById(action.media)
    return Object.assign({}, state, { taggables: mappedMedia })
  }

  return Object.assign({}, state, { taggables: { [action.media.id]: action.media } })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TAGGABLE: {
      return reduceAddFile(state, action)
    }

    default:
      return state
  }
}
