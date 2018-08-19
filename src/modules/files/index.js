import { remote } from 'electron'
import fs from 'fs'
import React from 'react'

const { dialog } = remote


class Home extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  addFile() {
    const content = 'Some text to save into the file.'
    dialog.showSaveDialog((filename) => {
      if (filename === undefined) {
        console.log('User did not save the file.')
        return
      }

      fs.writeFile(filename, content, (err) => {
        if (err) {
          alert(`An error ocurred creating the file: ${err.message}`)
        }

        alert('The file has been successfully saved.')
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Files</h1>
        <button
          className="btn btn-large btn-primary"
          onClick={this.addFile}
        >
          Add File
        </button>
      </div>
    )
  }
}

export default Home
