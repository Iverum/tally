import isArray from 'lodash/isArray'

// ACTION TYPES
export const ADD_TAGGABLE = 'tally/media/ADD_TAGGABLE'
export const ADD_TAG = 'tally/media/ADD_TAG'

// ACTION CREATORS
export const addMedia = taggable => ({
  media: taggable,
  type: ADD_TAGGABLE
})

export const addTag = tag => ({
  tag,
  type: ADD_TAG
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

function reduceAddTag(state = initialState, action) {
  if (isArray(action.tag)) {
    const mappedTags = mapById(action.tag)
    return Object.assign({}, state, { tags: mappedTags })
  }

  return Object.assign({}, state, { tags: { [action.tag.id]: action.tag } })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TAGGABLE: {
      return reduceAddFile(state, action)
    }

    case ADD_TAG: {
      return reduceAddTag(state, action)
    }

    default:
      return state
  }
}
