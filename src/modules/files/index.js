import React from 'react'

import { addFiles } from './actions'

class Files extends React.PureComponent {
  render() {
    return (
      <div>
        <button
          className="btn btn-large btn-positive"
          onClick={addFiles}
        >
          + Add Files
        </button>
      </div>
    )
  }
}

export default Files
