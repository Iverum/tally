import fs from 'fs'
import difference from 'lodash/difference'
import filter from 'lodash/filter'
import find from 'lodash/find'
import md5File from 'md5-file'
import path from 'path'

import { Tag, Taggable } from '../../database'
import { TAGGABLES_DIR } from './constants'
import { addMedia as addTaggable } from './dux'
import { selectTags } from './selectors'

/**
 * Gets all Taggables from the database and adds them to the Redux store.
 */
export const getAllMedia = () => dispatch => Taggable.findAll({
  include: [{
    as: 'tags',
    model: Tag
  }]
})
  .then((taggables = []) => dispatch(addTaggable(taggables)))
  .catch((err) => {
    console.error({ err }, 'An error ocurred fetching media')
  })

export const createTaggable = values => (dispatch, getState) => {
  if (!values.path) throw new Error('No path to media found')

  const extension = path.extname(values.path)
  return new Promise((resolve, reject) => {
    // First we want to get the checksum of the file
    md5File(values.path, (err, hash) => {
      if (err) reject(err)

      // Create the link name using the hash
      const linkname = `${path.join(TAGGABLES_DIR, hash)}${extension}`
      // Link the file
      fs.link(values.path, linkname, (e) => {
        if (e) reject(e)
      })

      // Handle tags
      const tags = values.tags.split(',').map(tag => ({ name: tag.trim() }))
      const existingTags = selectTags(getState())
      const newTags = filter(tags, t => !find(existingTags, et => t.name === et.name))
      const dupTags = difference(tags, newTags)
        .map(tag => find(existingTags, et => tag.name === et.name))

      // Create the database entry
      const taggable = Object.assign({}, values, { path: linkname, tags: newTags })
      Taggable.create(taggable, { include: ['tags'] })
        .then((t) => {
          t.addTags(dupTags).then(() => {
            dispatch(addTaggable(t))
            resolve(t)
          })
        })
    })
  })
}
