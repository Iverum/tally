import PropTypes from 'prop-types'
import React from 'react'

class ReversedCheckbox extends React.PureComponent {
  render() {
    return (
      <div className="checkbox">
        <label>
          <input
            disabled={this.props.disabled}
            onChange={() => this.props.input.onChange(!this.props.input.value)}
            type="checkbox"
            checked={!this.props.input.value}
          /> {this.props.label}
        </label>
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
  label: PropTypes.string.isRequired
}

ReversedCheckbox.defaultProps = {
  disabled: false
}

export default ReversedCheckbox
