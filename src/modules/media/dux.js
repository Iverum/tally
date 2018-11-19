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
  taggables: {
    allIds: [],
    byId: {}
  },
  tags: {
    allIds: [],
    byId: {}
  }
}

function reduceAddFile(state = initialState, action) {
  const newMedia = isArray(action.media) ? action.media : [action.media]

  const reducedState = newMedia.reduce((accumulator, media) => {
    const newState = Object.assign({}, accumulator);
    // Add the media to the store
    if (!newState.taggables.allIds.includes(media.id)) {
      newState.taggables.allIds.push(media.id)
    }
    newState.taggables.byId[media.id] = media

    // Add the tags to the store
    media.tags.forEach((tag) => {
      if (newState.tags.allIds.includes(tag.id)) {
        newState.tags.byId[tag.id].count += 1
      } else {
        newState.tags.allIds.push(tag.id)
        newState.tags.byId[tag.id] = Object.assign(tag, { count: 1 })
      }
    })

    return newState;
  }, {
    taggables: {
      allIds: [],
      byId: {}
    },
    tags: {
      allIds: [],
      byId: {}
    }
  })

  return Object.assign({}, state, reducedState)
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
