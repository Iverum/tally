import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

import { TAGGABLES_DIR } from './constants'
import { addFile } from './dux'

const { app, dialog } = remote

export const getFiles = () => (dispatch) => {
  fs.readdir(TAGGABLES_DIR, (err, files) => {
    if (err) {
      console.log({ err }, 'An error ocurred fetching taggable files')
      return
    }

    dispatch(addFile(files.map(basename => path.join(TAGGABLES_DIR, basename))))
  })
}

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
