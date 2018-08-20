import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

import Constants from './constants'
import { addFile } from './dux'

const { app, dialog } = remote

export const getFiles = () => (dispatch) => {
  fs.readdir(Constants.TAGGABLE_DIR, (err, files) => {
    if (err) {
      console.log({ err }, 'An error ocurred fetching taggable files')
      return
    }

    dispatch(addFile(files.map(basename => path.join(Constants.TAGGABLE_DIR, basename))))
  })
}

const linkFilesToTaggables = (filenames = [], cb) => {
  const taggablePath = Constants.TAGGABLE_DIR
  let fileCount = filenames.length
  let linkedFilenames = []

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
