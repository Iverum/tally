import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { getAllMedia } from './actions'
import Grid from './components/grid'

class Media extends React.PureComponent {
  componentWillMount() {
    this.props.actions.getAllMedia()
  }

  render() {
    return (
      <div>
        <Link to="/new"><button className="btn btn-large btn-positive">+ Add Media</button></Link>
        <Grid media={this.props.media} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  media: Object.values(state.media)
})

const mapActionsToDispatch = dispatch => ({
  actions: bindActionCreators({ getAllMedia }, dispatch)
})

Media.propTypes = {
  actions: PropTypes.shape({
    getAllMedia: PropTypes.func.isRequired
  }).isRequired,
  media: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default connect(mapStateToProps, mapActionsToDispatch)(Media)
