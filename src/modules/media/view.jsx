import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TagList from './components/tag-list'

class MediaView extends React.PureComponent {
  render() {
    return (
      <div className="pane-group">
        <TagList tags={this.props.taggable.tags}>
          <button className="btn btn-large btn-default" onClick={this.props.history.goBack}>Back</button>
        </TagList>
        <div className="pane">
          <img
            alt="TODO"
            src={this.props.taggable.path}
          />
        </div>
      </div>
    )
  }
}

MediaView.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  taggable: PropTypes.shape({
    path: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    }))
  }).isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    taggable: state.media.taggables[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps)(MediaView)
