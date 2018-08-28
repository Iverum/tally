import PropTypes from 'prop-types'
import React from 'react'

const CancelButton = ({ onClick }) => (
  <button
    className="btn btn-form btn-default"
    onClick={onClick}
  >
    Cancel
  </button>
)

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default CancelButton
