import Promise from 'bluebird'
import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

Promise.promisifyAll(fs)

import { TAGGABLES_DIR } from './constants'
import { addFile } from './dux'

const { app, dialog } = remote

/**
 * Gets all files from the USER_DATA/taggables directory and adds them to the Redux store.
 */
export const getFiles = () => (dispatch) => fs.readdirAsync(TAGGABLES_DIR)
  .then(files => dispatch(addFile(files.map(basename => path.join(TAGGABLES_DIR, basename)))))
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
