import fs from 'fs'
import React from 'react'

import { addFiles, getPathToTaggables } from './actions'
import Grid from './components/grid'

class Files extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  componentWillMount() {
    fs.readdir(getPathToTaggables(), (err, files) => {
      if (err) {
        console.log({ err }, 'An error ocurred fetching taggable files')
        return
      }

      this.setState({ files })
    })
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-large btn-positive"
          onClick={addFiles}
        >
          + Add Files
        </button>
        <Grid files={this.state.files} />
      </div>
    )
  }
}

export default Files
