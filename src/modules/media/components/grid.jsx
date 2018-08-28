import PropTypes from 'prop-types'
import React from 'react'

class MediaGrid extends React.PureComponent {
  render() {
    return (
      <div className="grid">
        {this.props.media.map(taggable => (
          <img
            alt="TODO" // TODO replace this with meaningful tag data
            key={taggable.id}
            src={taggable.path}
            onClick={() => console.log('CLICKED', { taggable })}
          />
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
