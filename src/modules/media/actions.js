import fs from 'fs'
import path from 'path'

import { Taggable } from '../../database'
import { TAGGABLES_DIR } from './constants'
import { addMedia as addTaggable } from './dux'

/**
 * Gets all Taggables from the database and adds them to the Redux store.
 */
export const getAllMedia = () => dispatch => Taggable.findAll({ raw: true })
  .then((taggables = []) => dispatch(addTaggable(taggables)))
  .catch((err) => {
    console.log({ err }, 'An error ocurred fetching taggable files')
  })

export const createTaggable = (values) => (dispatch) => {
  if (!values.path) throw new Error('No path to media found')

  const linkname = path.join(TAGGABLES_DIR, path.basename(values.path))
  return new Promise((resolve, reject) => {
    fs.link(values.path, linkname, (err) => {
      if (err) {
        reject(err)
      }

      const taggable = Object.assign({}, values, { path: linkname })
      Taggable.create(taggable, { raw: true })
        .then(t => {
          dispatch(addTaggable(t))
          resolve(t)
        })
    })
  })
}
