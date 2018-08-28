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
    return (
      <div className="form-group">
        <img src={this.props.input.value} />
        <button
          className="btn btn-default"
          onClick={this.selectFile}
        >
            {this.props.label}
        </button>
      </div>
    )
  }
}

ImageSelector.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  })
}

export default ImageSelector
