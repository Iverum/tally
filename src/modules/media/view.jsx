import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TagList from "./components/tag-list";
import { addSearchTerm, clearSearch } from "./dux";
import { selectMediaById, selectTagsWithCountByImage } from "./selectors";

class MediaView extends React.PureComponent {
  render() {
    return (
      <div className="pane-group">
        <TagList
          onTagClick={(tagId) => {
            this.props.actions.clearSearch();
            this.props.actions.addSearchTerm(tagId);
            this.props.history.goBack();
          }}
          tags={this.props.tags}
        >
          <button
            className="btn btn-large btn-default"
            onClick={this.props.history.goBack}
          >
            Back
          </button>
        </TagList>
        <div className="pane">
          <img
            alt={this.props.tags.map(t => t.name).join()}
            src={this.props.taggable.path}
            style={{ height: "100%", width: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
      </div>
    );
  }
}

MediaView.propTypes = {
  actions: PropTypes.shape({
    addSearchTerm: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  taggable: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

function mapStateToProps(state, ownProps) {
  const queryProps = { id: ownProps.match.params.id };
  return {
    taggable: selectMediaById(state, queryProps),
    tags: Object.values(selectTagsWithCountByImage(state, queryProps))
  };
}

const mapActionsToDispatch = dispatch => ({
  actions: bindActionCreators({ addSearchTerm, clearSearch }, dispatch)
});

export default connect(
  mapStateToProps,
  mapActionsToDispatch
)(MediaView);
