import isArray from 'lodash/isArray';

import sequelize from '../../database';

// ACTION TYPES
export const ADD_TAGGABLE = 'tally/media/ADD_TAGGABLE';
export const SET_SEARCH = 'tally/media/SET_SEARCH';
export const SET_SEARCH_RESULTS = 'tally/media/SET_SEARCH_RESULTS'

const SEARCH_QUERY = `
  SELECT DISTINCT Taggables.id FROM Taggables
  INNER JOIN ItemTag tag
  WHERE Taggables.id = tag.TaggableId AND tag.TagId IN (:tagIds)
  AND (
    SELECT COUNT(ItemTag.TaggableId)
    FROM ItemTag WHERE ItemTag.TagId IN (:tagIds)
    AND Taggables.id = ItemTag.TaggableId
  ) = :tagIdsLength
`

function getSearchResults(tagIds) {
  if (tagIds.length <= 0) {
    return Promise.resolve([]);
  }

  return sequelize.query(SEARCH_QUERY,
    {
      replacements: { tagIds, tagIdsLength: tagIds.length },
      type: sequelize.QueryTypes.SELECT
    }
  ).catch(console.error);
}

// ACTION CREATORS
export const addMedia = taggable => ({
  media: taggable,
  type: ADD_TAGGABLE
});

export const addSearchTerm = tagId => (dispatch, getState) => {
  const state = getState();
  const searchTags = [...state.media.searchedTagIds, tagId];

  dispatch({
    search: searchTags,
    type: SET_SEARCH
  })

  return getSearchResults(searchTags).then(response => dispatch({
    searchResultIds: response.map(result => result.id),
    type: SET_SEARCH_RESULTS
  }))
};

export const removeSearchTerm = tagId => (dispatch, getState) => {
  const state = getState()
  const searchTags = [...state.media.searchedTagIds]
  searchTags.splice(searchTags.indexOf(tagId), 1)

  dispatch({
    search: searchTags,
    type: SET_SEARCH
  })

  return getSearchResults(searchTags).then(response => dispatch({
    searchResultIds: response.map(result => result.id),
    type: SET_SEARCH_RESULTS
  }))
};

export const clearSearch = () => (dispatch) => {
  dispatch({ type: SET_SEARCH, search: [] })
  dispatch({ type: SET_SEARCH_RESULTS, searchResultIds: [] })
};

// REDUCER
const initialState = {
  searchedTagIds: [],
  searchResultIds: [],
  taggables: {
    allIds: [],
    byId: {}
  },
  tags: {
    allIds: [],
    byId: {}
  }
};

function reduceAddFile(state = initialState, action) {
  const newMedia = isArray(action.media) ? action.media : [action.media];

  const reducedState = newMedia.reduce(
    (accumulator, media) => {
      const newState = Object.assign({}, accumulator);
      // Add the media to the store
      if (!newState.taggables.allIds.includes(media.id)) {
        newState.taggables.allIds.push(media.id);
      }
      newState.taggables.byId[media.id] = media;

      // Add the tags to the store
      media.tags.forEach(tag => {
        if (newState.tags.allIds.includes(tag.id)) {
          newState.tags.byId[tag.id].count += 1;
        } else {
          newState.tags.allIds.push(tag.id);
          newState.tags.byId[tag.id] = Object.assign(tag, { count: 1 });
        }
      });

      return newState;
    },
    {
      taggables: {
        allIds: [],
        byId: {}
      },
      tags: {
        allIds: [],
        byId: {}
      }
    }
  );

  return Object.assign({}, state, reducedState);
}

function reduceSetSearch(state = initialState, action) {
  return Object.assign({}, state, {
    searchedTagIds: action.search
  })
}

function reduceSetSearchResults(state = initialState, action) {
  return Object.assign({}, state, {
    searchResultIds: action.searchResultIds
  })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TAGGABLE: {
      return reduceAddFile(state, action);
    }

    case SET_SEARCH: {
      return reduceSetSearch(state, action);
    }

    case SET_SEARCH_RESULTS: {
      return reduceSetSearchResults(state, action);
    }

    default:
      return state;
  }
};
