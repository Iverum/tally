import React from 'react'
import { Field, reduxForm } from 'redux-form'

import TextField from './components/form/text'

const CancelButton = ({ onClick }) => (
  <button
    className="btn btn-form btn-default"
    onClick={onClick}
  >
    Cancel
  </button>
)

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
        <div className="form-group">
          <img src={undefined} />
          <button className="btn btn-default">Select File</button>
        </div>
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
        <div className="checkbox">
          <label>
            <input type="checkbox" /> NSFW
          </label>
        </div>
        <div className="form-actions">
          <CancelButton onClick={this.goBack} />
          <button type="submit" className="btn btn-form btn-primary">OK</button>
        </div>
      </div>
    )
  }
}

export default reduxForm({ form: 'newMedia' })(NewMedia)
