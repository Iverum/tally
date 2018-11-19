import isEmpty from 'lodash/isEmpty'
import { createSelector } from 'reselect'

export const selectMedia = state => Object.values(state.media.taggables.byId) || []

export const selectTags = state => Object.values(state.media.tags.byId) || []

export const selectMediaById = (state, props) => state.media.taggables.byId[props.id]

export const selectTagsWithCountByImage = createSelector(
  [selectMediaById, state => state.media.tags.byId],
  (media, tags) => media.tags.reduce(
    (imageTags, tag) => Object.assign({}, imageTags, { [tag.id]: tags[tag.id] }),
    {}
  )
)

export const selectSearchedTags = createSelector(
  [state => state.media.tags.byId, state => state.media.searchedTagIds],
  (tags, searchedTagIds) => searchedTagIds.map(id => tags[id])
)

export const selectMediaWithTags = createSelector(
  [
    state => state.media.searchedTagIds,
    state => state.media.taggables.byId,
    state => Object.values(state.media.taggableTags.byId)
  ],
  (searchedTagIds, taggables, join) => {
    if (isEmpty(searchedTagIds)) {
      return Object.values(taggables)
    }

    return join.filter(j => searchedTagIds.some(id => id === j.tagId))
      .reduce((results, current) => [...results, taggables[current.taggableId]], [])
  }
)
