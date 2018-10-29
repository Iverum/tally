export const selectMedia = state => Object.values(state.media.taggables) || []

export const selectTags = state => Object.values(state.media.tags) || []
