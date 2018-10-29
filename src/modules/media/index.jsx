import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { getAllMedia } from './actions'
import Grid from './components/grid'
import TagList from './components/tag-list'
import { selectMedia, selectTags } from './selectors';

class Media extends React.PureComponent {
  componentWillMount() {
    this.props.actions.getAllMedia()
  }

  render() {
    return (
      <div className="pane-group">
        <TagList tags={this.props.tags}>
          <Link to="/new"><button className="btn btn-large btn-positive">+ Add Media</button></Link>
        </TagList>
        <Grid media={this.props.media} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  media: selectMedia(state),
  tags: selectTags(state)
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
