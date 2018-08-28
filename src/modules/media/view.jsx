import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

class MediaView extends React.PureComponent {
  render() {
    return (
      <div>
        <img
          alt="TODO"
          src={this.props.taggable.path}
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    taggable: state.media[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps)(MediaView)
