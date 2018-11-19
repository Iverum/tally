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
