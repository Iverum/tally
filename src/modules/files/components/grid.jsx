import path from 'path'
import PropTypes from 'prop-types'
import React from 'react'

import { getPathToTaggables } from '../actions'

class FileGrid extends React.PureComponent {
  render() {
    return (
      <div className="grid">
        {this.props.files.map(filename => (
          <img
            alt="TODO" // TODO replace this with meaningful tag data
            key={filename}
            src={path.join(getPathToTaggables(), filename)}
          />
        ))}
      </div>
    )
  }
}

FileGrid.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string)
}

FileGrid.defaultProps = {
  files: []
}

export default FileGrid
