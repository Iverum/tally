import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';

const Tag = ({ onTagClick, tag }) => (
  <a
    className="nav-group-item tag"
    onClick={() => onTagClick(tag.id)}
    onKeyPress={() => onTagClick(tag.id)}
    role="button"
    tabIndex={0}
  >
    {tag.name} {tag.count}
  </a>
);
Tag.propTypes = {
  onTagClick: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

const SearchedTags = props => (
  <div>
    <h5 className="nav-group-title">Searched Tags</h5>
    {props.tags.map(tag => (
      <Tag key={`search_${tag.name}`} onTagClick={props.onTagClick} tag={tag} />
    ))}
  </div>
);
SearchedTags.propTypes = {
  onTagClick: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

const TagList = props => (
  <div className="pane-sm sidebar">
    {props.children}
    <nav className="nav-group">
      {!isEmpty(props.searchedTags) && (
        <SearchedTags
          onTagClick={props.onSearchedTagClick}
          tags={props.searchedTags}
        />
      )}
      <h5 className="nav-group-title">Tags</h5>
      {props.tags.map(tag => (
        <Tag key={`list_${tag.name}`} onTagClick={props.onTagClick} tag={tag} />
      ))}
    </nav>
  </div>
);

TagList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  onSearchedTagClick: PropTypes.func,
  onTagClick: PropTypes.func.isRequired,
  searchedTags: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

TagList.defaultProps = {
  children: null,
  onSearchedTagClick: noop,
  searchedTags: [],
  tags: []
};

export default TagList;
