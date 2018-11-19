import isArray from 'lodash/isArray'

// ACTION TYPES
export const ADD_TAGGABLE = 'tally/media/ADD_TAGGABLE'
export const ADD_SEARCH = 'tally/media/ADD_SEARCH_TERM'
export const REMOVE_SEARCH = 'tally/media/REMOVE_SEARCH_TERM'
export const CLEAR_SEARCH = 'tally/media/CLEAR_SEARCH'


// ACTION CREATORS
export const addMedia = taggable => ({
  media: taggable,
  type: ADD_TAGGABLE
})

export const addSearchTerm = tagId => ({
  tagId,
  type: ADD_SEARCH
})

export const removeSearchTerm = tagId => ({
  tagId,
  type: REMOVE_SEARCH
})

export const clearSearch = () => ({ type: REMOVE_SEARCH })

// REDUCER
const initialState = {
  searchedTagIds: [],
  taggables: {
    allIds: [],
    byId: {}
  },
  taggableTags: {
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

      const taggableTag = {
        id: newState.taggableTags.allIds.length + 1,
        taggableId: media.id,
        tagId: tag.id
      }
      newState.taggableTags.allIds.push(taggableTag.id)
      newState.taggableTags.byId[taggableTag.id] = taggableTag
    })

    return newState;
  }, {
    taggables: {
      allIds: [],
      byId: {}
    },
    taggableTags: {
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

function reduceAddSearchTerm(state = initialState, action) {
  return Object.assign({}, state, { searchedTagIds: [...state.searchedTagIds, action.tagId] })
}

function reduceRemoveSearchTerm(state = initialState, action) {
  const searchTerms = [...state.searchedTagIds]
  searchTerms.splice(searchTerms.indexOf(action.tagId), 1)
  return Object.assign({}, state, { searchedTagIds: searchTerms })
}

function reduceClearSearch(state = initialState) {
  return Object.assign({}, state, { searchedTagIds: [] })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TAGGABLE: {
      return reduceAddFile(state, action)
    }

    case ADD_SEARCH: {
      return reduceAddSearchTerm(state, action)
    }

    case REMOVE_SEARCH: {
      return reduceRemoveSearchTerm(state, action)
    }

    case CLEAR_SEARCH: {
      return reduceClearSearch(state, action)
    }

    default:
      return state
  }
}
