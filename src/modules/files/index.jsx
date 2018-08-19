import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addFiles, getFiles } from './actions'
import Grid from './components/grid'

class Files extends React.PureComponent {
  componentWillMount() {
    this.props.actions.getFiles()
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
        <Grid files={this.props.files} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  files: state.files
})

const mapActionsToDispatch = dispatch => ({
  actions: bindActionCreators({ getFiles }, dispatch)
})

Files.propTypes = {
  actions: PropTypes.shape({ getFiles: PropTypes.func.isRequired }).isRequired,
  files: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default connect(mapStateToProps, mapActionsToDispatch)(Files)
