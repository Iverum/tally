import fs from 'fs'
import md5File from 'md5-file'
import path from 'path'

import { Tag, Taggable } from '../../database'
import { TAGGABLES_DIR } from './constants'
import { addMedia as addTaggable, addTag } from './dux'

/**
 * Gets all Taggables from the database and adds them to the Redux store.
 */
export const getAllMedia = () => dispatch => Taggable.findAll({ raw: true })
  .then((taggables = []) => dispatch(addTaggable(taggables)))
  .then(() => Tag.findAll({ raw: true }))
  .then((tags = []) => dispatch(addTag(tags)))
  .catch((err) => {
    console.error({ err }, 'An error ocurred fetching media')
  })

export const createTaggable = values => (dispatch) => {
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

      // Create the database entry
      const tags = values.tags.split(',').map(tag => ({ name: tag.trim() }))
      const taggable = Object.assign({}, values, { path: linkname, tags })
      console.log({ taggable })
      Taggable.create(taggable, { include: ['tags'], raw: true })
        .then((t) => {
          dispatch(addTaggable(t))
          resolve(t)
        })
    })
  })
}
