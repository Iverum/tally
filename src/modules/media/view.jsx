import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import TagList from './components/tag-list'
import { selectMediaById, selectTagsWithCountByImage } from './selectors';

class MediaView extends React.PureComponent {
  render() {
    return (
      <div className="pane-group">
        <TagList tags={this.props.tags}>
          <button
            className="btn btn-large btn-default"
            onClick={this.props.history.goBack}
          >
            Back
          </button>
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
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
}

function mapStateToProps(state, ownProps) {
  const queryProps = { id: ownProps.match.params.id }
  return {
    taggable: selectMediaById(state, queryProps),
    tags: Object.values(selectTagsWithCountByImage(state, queryProps))
  }
}

export default connect(mapStateToProps)(MediaView)
