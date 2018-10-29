import { createSelector } from 'reselect'

export const selectMedia = state => state.media.taggables || []

export const selectTags = state => state.media.tags || []

export const selectMediaById = (state, props) => state.media.taggables[props.id]

export const selectTagsWithCounts = createSelector(
  [selectMedia],
  taggables => Object.values(taggables).reduce((tags, currentTaggable) => {
    currentTaggable.tags.forEach((tag) => {
      const tagId = tag.id
      if (tags[tagId]) {
        tags[tagId].count += 1 // eslint-disable-line no-param-reassign
      } else {
        // eslint-disable-next-line no-param-reassign
        tags[tagId] = Object.assign({}, tag.get({ plain: true }), { count: 1 })
      }
    })
    return tags
  }, {})
)

export const selectTagsWithCountByImage = createSelector(
  [selectMediaById, selectTagsWithCounts],
  (media, tags) => media.tags.reduce(
    (imageTags, tag) => Object.assign({}, imageTags, { [tag.id]: tags[tag.id] }),
    {}
  )
)
