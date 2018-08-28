import PropTypes from 'prop-types'
import React from 'react'

class ReversedCheckbox extends React.PureComponent {
  render() {
    const { disabled, input, label, meta } = this.props
    return (
      <div className="checkbox">
        <label>
          <input
            disabled={disabled}
            onChange={() => input.onChange(!input.value)}
            type="checkbox"
            checked={!input.value}
          /> {label}
        </label>
        {meta.touched && <span className="error">{meta.error}</span>}
      </div>
    )
  }
}

ReversedCheckbox.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool
  }).isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired
  }).isRequired
}

ReversedCheckbox.defaultProps = {
  disabled: false
}

export default ReversedCheckbox
