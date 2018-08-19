import path from 'path'
import React from 'react'

import { getPathToTaggables } from '../actions'

class FileGrid extends React.PureComponent {
  render() {
    return (
      <div className="grid">
        {this.props.files.map(filename => (
          <img
            key={filename}
            src={path.join(getPathToTaggables(), filename)}
          />
        ))}
      </div>
    )
  }
}

export default FileGrid
