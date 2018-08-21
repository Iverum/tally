import Promise from 'bluebird'
import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

Promise.promisifyAll(fs)

import { Taggable } from '../../database'
import { TAGGABLES_DIR } from './constants'
import { addMedia } from './dux'

const { app, dialog } = remote

/**
 * Gets all Taggables from the database and adds them to the Redux store.
 */
export const getAllMedia = () => (dispatch) => Taggable.findAll()
  .then((taggables = []) => dispatch(addMedia(taggables)))
  .catch((err) => {
    console.log({ err }, 'An error ocurred fetching taggable files')
  })

const linkFilesToTaggables = (filenames = [], cb) => {
  const taggablePath = TAGGABLES_DIR
  let fileCount = filenames.length
  const linkedFilenames = []

  filenames.forEach((filename) => {
    const linkName = path.join(taggablePath, path.basename(filename))
    fs.link(filename, linkName, (err) => {
      fileCount -= 1

      if (err) {
        cb(err, linkedFilenames)
        return
      }

      linkedFilenames.push(linkName)

      if (fileCount <= 0) {
        cb(null, linkedFilenames)
      }
    })
  })
}

export const addFiles = () => (dispatch) => {
  const picturesPath = app.getPath('pictures')
  dialog.showOpenDialog(remote.getCurrentWindow(), {
    title: 'Add File',
    defaultPath: picturesPath,
    buttonLabel: 'Add',
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
    properties: ['openFile', 'multiSelections']
  }, (filePaths) => {
    linkFilesToTaggables(filePaths, (err, linkedFiles) => {
      if (err) {
        console.log(err)
      }

      if (linkedFiles.length > 0) {
        dispatch(addFile(linkedFiles))
      }
    })
  })
}
