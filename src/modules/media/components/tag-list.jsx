import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import React from 'react'

const SearchedTags = props => (
  <div>
    <h5 className="nav-group-title">Searched Tags</h5>
    {props.tags.map(tag => (
      <a
        className="nav-group-item"
        key={`search_${tag.name}`}
        onClick={() => props.onTagClick(tag.id)}
      >
        {tag.name} {tag.count}
      </a>
    ))}
  </div>
)
SearchedTags.propTypes = {
  onTagClick: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
}

const TagList = props => (
  <div className="pane-sm sidebar">
    {props.children}
    <nav className="nav-group">
      {!isEmpty(props.searchedTags) && <SearchedTags onTagClick={props.onSearchedTagClick} tags={props.searchedTags} />}
      <h5 className="nav-group-title">Tags</h5>
      {props.tags.map(tag => (
        <a
          className="nav-group-item"
          key={`list_${tag.name}`}
          onClick={() => props.onTagClick(tag.id)}
        >
          {tag.name} {tag.count}
        </a>
      ))}
    </nav>
  </div>
)

TagList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  onSearchedTagClick: PropTypes.func,
  onTagClick: PropTypes.func.isRequired,
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
  onSearchedTagClick: noop,
  searchedTags: [],
  tags: []
}

export default TagList
