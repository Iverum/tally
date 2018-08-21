import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addFiles, getAllMedia } from './actions'
import Grid from './components/grid'

class Files extends React.PureComponent {
  componentWillMount() {
    this.props.actions.getAllMedia()
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-large btn-positive"
          onClick={this.props.actions.addFiles}
        >
          + Add Media
        </button>
        <Grid files={this.props.media} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  media: state.media
})

const mapActionsToDispatch = dispatch => ({
  actions: bindActionCreators({ addFiles, getAllMedia }, dispatch)
})

Files.propTypes = {
  actions: PropTypes.shape({
    addFiles: PropTypes.func.isRequired,
    getAllMedia: PropTypes.func.isRequired
  }).isRequired,
  media: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(mapStateToProps, mapActionsToDispatch)(Files)
