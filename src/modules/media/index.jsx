import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { getAllMedia } from './actions'
import Grid from './components/grid'
import TagList from './components/tag-list'
import { addSearchTerm, removeSearchTerm } from './dux';
import { selectMediaWithTags, selectSearchedTags, selectTags } from './selectors';

class Media extends React.PureComponent {
  componentWillMount() {
    this.props.actions.getAllMedia()
  }

  render() {
    return (
      <div className="pane-group">
        <TagList
          onSearchedTagClick={this.props.actions.removeSearchTerm}
          onTagClick={this.props.actions.addSearchTerm}
          searchedTags={this.props.searchedTags}
          tags={this.props.tags}
        >
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

const mapStateToProps = (state, ownProps) => ({
  media: Object.values(selectMediaWithTags(state, ownProps)),
  searchedTags: selectSearchedTags(state, ownProps),
  tags: Object.values(selectTags(state))
})

const mapActionsToDispatch = dispatch => ({
  actions: bindActionCreators({ addSearchTerm, getAllMedia, removeSearchTerm }, dispatch)
})

Media.propTypes = {
  actions: PropTypes.shape({
    addSearchTerm: PropTypes.func.isRequired,
    getAllMedia: PropTypes.func.isRequired,
    removeSearchTerm: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
  media: PropTypes.arrayOf(PropTypes.object),
  searchedTags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })),
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })),
}

Media.defaultProps = {
  media: [],
  searchedTags: [],
  tags: []
}

export default connect(mapStateToProps, mapActionsToDispatch)(Media)
