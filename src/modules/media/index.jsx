import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addMedia, getAllMedia } from './actions'
import Grid from './components/grid'

class Media extends React.PureComponent {
  componentWillMount() {
    this.props.actions.getAllMedia()
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-large btn-positive"
          onClick={this.props.actions.addMedia}
        >
          + Add Media
        </button>
        <Grid media={this.props.media} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  media: state.media
})

const mapActionsToDispatch = dispatch => ({
  actions: bindActionCreators({ addMedia, getAllMedia }, dispatch)
})

Media.propTypes = {
  actions: PropTypes.shape({
    addMedia: PropTypes.func.isRequired,
    getAllMedia: PropTypes.func.isRequired
  }).isRequired,
  media: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(mapStateToProps, mapActionsToDispatch)(Media)
