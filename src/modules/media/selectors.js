import uniqBy from 'lodash/uniqBy'
import { createSelector } from 'reselect'

export const selectMedia = state => Object.values(state.media.taggables) || []

export const selectTags = createSelector(
  [selectMedia],
  taggables => uniqBy(taggables.reduce((accumulatedTags, taggable) => {
    accumulatedTags.push(...taggable.tags)
    return accumulatedTags
  }, []), 'id')
)
