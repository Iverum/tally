import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

class MediaView extends React.PureComponent {
  render() {
    return (
      <div>
        <button className="btn btn-default" onClick={this.props.history.goBack}>Back</button>
        <img
          alt="TODO"
          src={this.props.taggable.path}
        />
      </div>
    )
  }
}

MediaView.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  taggable: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    taggable: state.media.taggables[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps)(MediaView)
