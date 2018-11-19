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

const selectSearchedTagNames = (state, props) => {
  const { search } = props.location
  if (isEmpty(search)) { return [] }

  const searchQueries = search.substring(1).split('=')
  const tagsIndex = searchQueries.indexOf('tags')
  if (tagsIndex < 0) { return [] }

  return searchQueries[tagsIndex + 1].split(',')
}

export const selectSearchedTags = createSelector(
  [selectTags, selectSearchedTagNames],
  (tags, searchedTagNames) => searchedTagNames.reduce((searchedTags, name) => {
    const foundTag = tags.find(t => t.name === name)
    if (!foundTag) return searchedTags
    return [...searchedTags, foundTag]
  }, [])
)

export const selectMediaWithTags = createSelector(
  [
    selectSearchedTags,
    state => state.media.taggables.byId,
    state => Object.values(state.media.taggableTags.byId)
  ],
  (searchedTags, taggables, join) => {
    if (isEmpty(searchedTags)) {
      return Object.values(taggables)
    }

    return join.filter(j => searchedTags.some(t => t.id === j.tagId))
      .reduce((results, current) => [...results, taggables[current.taggableId]], [])
  }
)
