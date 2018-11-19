import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchedTags = props => (
  <div>
    <h5 className="nav-group-title">Searched Tags</h5>
    {props.tags.map(tag => (
      <Link
        className="nav-group-item"
        key={tag.name}
        to={{ pathname: '/', search: `tags=${tag.name}` }}
      >
        {tag.name} {tag.count}
      </Link>
    ))}
  </div>
)

const TagList = props => (
  <div className="pane-sm sidebar">
    {props.children}
    <nav className="nav-group">
      {!isEmpty(props.searchedTags) && <SearchedTags tags={props.searchedTags} />}
      <h5 className="nav-group-title">Tags</h5>
      {props.tags.map(tag => (
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

TagList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  searchedTags: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })),
  tags: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }))
}

TagList.defaultProps = {
  children: null,
  searchedTags: [],
  tags: []
}

export default TagList
