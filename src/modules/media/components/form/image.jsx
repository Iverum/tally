import { remote } from 'electron'
import path from 'path'
import PropTypes from 'prop-types'
import React from 'react'

const { app, dialog } = remote
const picturesPath = app.getPath('pictures')
let lastPath

function dialogOptions() {
  return {
    defaultPath: lastPath || picturesPath,
    filters: [{ extensions: ['jpg', 'png', 'gif'], name: 'Images' }],
    properties: ['openFile'],
    title: 'Add File'
  }
}

class ImageSelector extends React.PureComponent {
  constructor(props) {
    super(props)
    this.selectFile = this.selectFile.bind(this)
  }

  selectFile() {
    dialog.showOpenDialog(remote.getCurrentWindow(), dialogOptions(), (filepaths) => {
      if (!filepaths) return
      lastPath = path.dirname(filepaths[0])
      this.props.input.onChange(filepaths[0])
    })
  }

  render() {
    const { input, label, meta } = this.props
    return (
      <div className="form-group">
        <img alt={input.value} src={input.value} />
        <button
          className="btn btn-default"
          onClick={this.selectFile}
        >
          {label}
        </button>
        <br />
        {meta.touched && <span className="error">{meta.error}</span>}
      </div>
    )
  }
}

ImageSelector.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired
  }).isRequired
}

export default ImageSelector
