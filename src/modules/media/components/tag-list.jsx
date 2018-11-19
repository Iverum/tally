import isEmpty from "lodash/isEmpty"
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchedTags = props => (
  <div>
    <h5 className="nav-group-title">Searched Tags</h5>
    {props.tags.map(tag => (
      <a
        className="nav-group-item"
        key={tag}
      >
        {tag}
      </a>
    ))}
  </div>
)

class TagList extends React.PureComponent {
  render() {
    return (
      <div className="pane-sm sidebar">
        {this.props.children}
        <nav className="nav-group">
          {!isEmpty(this.props.searched) && <SearchedTags tags={this.props.searched} />}
          <h5 className="nav-group-title">Tags</h5>
          {this.props.tags.map(tag => (
            <Link
              className="nav-group-item"
              key={tag.name}
              to={{ pathname: '/', search: `tags=${tag.name}` }}
            >
              {tag.name} {tag.count}
            </Link>
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
