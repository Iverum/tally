import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

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

function mapStateToProps() {
  return {
    initialValues: {
      path: null,
      source: null,
      safe: true
    },
    onSubmit: values => console.log({ values }) // TODO make into action
  }
}

export default connect(mapStateToProps)(
  reduxForm({ form: 'newMedia', validate })(NewMedia)
)
