import isEmpty from "lodash/isEmpty";
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { getAllMedia } from './actions'
import Grid from './components/grid'
import TagList from './components/tag-list'
import { selectMedia, selectTagsWithCounts } from './selectors';

class Media extends React.PureComponent {
  componentWillMount() {
    this.props.actions.getAllMedia()
  }

  getSearchedTags() {
    const { search } = this.props.location
    if (isEmpty(search)) { return [] }

    const searchQueries = search.substring(1).split('=')
    const tagsIndex = searchQueries.indexOf('tags')
    if (tagsIndex < 0) { return [] }

    return searchQueries[tagsIndex + 1].split(',')
  }

  render() {
    return (
      <div className="pane-group">
        <TagList searched={this.getSearchedTags()} tags={this.props.tags}>
          <div className="tag-list-header">
            <Link to="/new"><button className="btn btn-large btn-positive">
              + Add Media
            </button></Link>
          </div>
        </TagList>
        <Grid media={this.props.media} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  media: Object.values(selectMedia(state)),
  tags: Object.values(selectTagsWithCounts(state))
})

const mapActionsToDispatch = dispatch => ({
  actions: bindActionCreators({ getAllMedia }, dispatch)
})

Media.propTypes = {
  actions: PropTypes.shape({
    getAllMedia: PropTypes.func.isRequired
  }).isRequired,
  media: PropTypes.arrayOf(PropTypes.object),
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }))
}

Media.defaultProps = {
  media: [],
  tags: []
}

export default connect(mapStateToProps, mapActionsToDispatch)(Media)
