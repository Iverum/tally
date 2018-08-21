import Promise from 'bluebird'
import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

Promise.promisifyAll(fs)

import { Taggable } from '../../database'
import { TAGGABLES_DIR } from './constants'
import { addMedia as addTaggable } from './dux'

const { app, dialog } = remote

/**
 * Gets all Taggables from the database and adds them to the Redux store.
 */
export const getAllMedia = () => (dispatch) => Taggable.findAll({ raw: true })
  .then((taggables = []) => dispatch(addTaggable(taggables)))
  .catch((err) => {
    console.log({ err }, 'An error ocurred fetching taggable files')
  })

export const addMedia = () => (dispatch) => {
  const picturesPath = app.getPath('pictures')
  dialog.showOpenDialog(remote.getCurrentWindow(), {
    title: 'Add File',
    defaultPath: picturesPath,
    buttonLabel: 'Add',
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
    properties: ['openFile']
  }, (filepaths) => {
    if (!filepaths) {
      return
    }

    const filename = filepaths[0]
    const linkname = path.join(TAGGABLES_DIR, path.basename(filename))
    fs.link(filename, linkname, (err) => {
      if (err) {
        console.log({ err }, 'Could not add file')
        return
      }

      Taggable.create({ path: linkname }, { raw: true })
        .then((taggable) => dispatch(addTaggable(taggable)))
    })
  })
}
