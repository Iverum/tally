import { remote } from 'electron'
import PropTypes from 'prop-types'
import React from 'react'

const { app, dialog } = remote
const picturesPath = app.getPath('pictures') // TODO use recent files
const dialogOptions = {
  title: 'Add File',
  defaultPath: picturesPath,
  filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }],
  properties: ['openFile']
}

class ImageSelector extends React.PureComponent {
  constructor(props) {
    super(props)
    this.selectFile = this.selectFile.bind(this)
  }

  selectFile() {
    dialog.showOpenDialog(remote.getCurrentWindow(), dialogOptions, (filepaths) => {
      if (!filepaths) return
      this.props.input.onChange(filepaths[0])
    })
  }

  render() {
    const { input, label, meta } = this.props
    return (
      <div className="form-group">
        <img src={input.value} alt={input.value} />
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
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired
  }).isRequired
}

export default ImageSelector
