import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

const { app, dialog } = remote

const getPathToTaggables = () => path.join(app.getPath('userData'), 'taggables')

const linkFilesToTaggables = (filenames = [], cb) => {
  const taggablePath = getPathToTaggables()
  let fileCount = filenames.length

  filenames.forEach((filename) => {
    const linkName = path.join(taggablePath, path.basename(filename))
    fs.link(filename, linkName, (err) => {
      fileCount--

      if (err) {
        cb(err)
        return
      }

      if (fileCount <= 0) {
        cb(null)
      }
    })
  })
}

export const addFiles = () => {
  const picturesPath = app.getPath('pictures')
  dialog.showOpenDialog(remote.getCurrentWindow(), {
    title: 'Add File',
    defaultPath: picturesPath,
    buttonLabel: 'Add',
    filters: [{name: 'Images', extensions: ['jpg', 'png', 'gif']}],
    properties: ['openFile', 'multiSelections']
  }, (filePaths) => {
    console.log('Selected', { filePaths })
    linkFilesToTaggables(filePaths, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('All files linked')
      }
    })
  })
}
