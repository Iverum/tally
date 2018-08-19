import React from 'react'

import { addFiles } from './actions'

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Files</h1>
        <button
          className="btn btn-large btn-primary"
          onClick={addFiles}
        >
          Add File
        </button>
      </div>
    )
  }
}

export default Home
