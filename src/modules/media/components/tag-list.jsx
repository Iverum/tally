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
              {tag.name} {tag.count}
            </a>
          ))}
        </nav>
      </div>
    )
  }
}

TagList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  tags: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }))
}

TagList.defaultProps = {
  children: null,
  tags: []
}

export default TagList
