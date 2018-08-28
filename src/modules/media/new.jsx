import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'

import { createTaggable } from './actions'
import CancelButton from './components/form/cancel'
import Checkbox from './components/form/checkbox'
import ImageSelector from './components/form/image'
import TextField from './components/form/text'
import { validate } from './util'

class NewMedia extends React.PureComponent {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <h3>Add New Media</h3>
        <Field
          component={ImageSelector}
          name="path"
          label="Select File"
        />
        <Field
          component={TextField}
          name="source"
          label="Source"
        />
        <Field
          component={TextField}
          disabled
          name="tags"
          label="Tags"
        />
        <Field
          component={Checkbox}
          name="safe"
          label="NSFW"
        />
        <div className="form-actions">
          <CancelButton onClick={this.goBack} />
          <button
            className="btn btn-form btn-primary"
            onClick={this.props.submit}
            type="submit"
          >
            OK
          </button>
        </div>
      </div>
    )
  }
}

NewMedia.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  submit: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      path: null,
      source: null,
      safe: true
    },
    onSubmitSuccess: ownProps.history.goBack
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(createTaggable, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'newMedia', validate })(NewMedia)
)
