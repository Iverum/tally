import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

class MediaGrid extends React.PureComponent {
  render() {
    return (
      <div className="grid">
        {this.props.media.map(taggable => (
          <Link key={taggable.id} to={`/${taggable.id}`}>
            <img
              alt="TODO" // TODO replace this with meaningful tag data
              src={taggable.path}
            />
          </Link>
        ))}
      </div>
    )
  }
}

MediaGrid.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object)
}

MediaGrid.defaultProps = {
  media: []
}

export default MediaGrid
