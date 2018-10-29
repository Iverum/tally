import PropTypes from 'prop-types'
import React from 'react'

class TagList extends React.PureComponent {
  render() {
    return (
      <div className="pane-sm sidebar">
        {this.props.children}
        <nav className="nav-group">
          <h5 className="nav-group-title">Tags</h5>
          {this.props.tags.map(tag => (
            <a
              key={tag.name}
              className="nav-group-item"
            >
              {tag.name}
            </a>
          ))}
        </nav>
      </div>
    )
  }
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }))
}

TagList.defaultProps = {
  tags: []
}

export default TagList
