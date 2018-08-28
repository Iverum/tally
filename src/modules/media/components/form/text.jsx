import PropTypes from 'prop-types'
import React from 'react'

class TextField extends React.PureComponent {
  render() {
    const { disabled, input, label, meta } = this.props
    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <input
          id={input.name}
          className="form-control"
          disabled={disabled}
          onChange={input.onChange}
          type="text"
          value={input.value}
        />
        {meta.touched && <span className="error">{meta.error}</span>}
      </div>
    )
  }
}

TextField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired
  }).isRequired
}

TextField.defaultProps = {
  disabled: false
}

export default TextField
