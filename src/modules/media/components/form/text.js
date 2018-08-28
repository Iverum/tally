import PropTypes from 'prop-types'
import React from 'react'

class TextField extends React.PureComponent {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input
          className="form-control"
          disabled={this.props.disabled}
          onChange={this.props.input.onChange}
          type="text"
          value={this.props.input.value}
        />
      </div>
    )
  }
}

TextField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }).isRequired,
  label: PropTypes.string.isRequired
}

TextField.defaultProps = {
  disabled: false
}

export default TextField
