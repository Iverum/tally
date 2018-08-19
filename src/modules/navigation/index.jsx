import PropTypes from 'prop-types'
import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'

import Drawer from './components/drawer'

class Navigation extends React.PureComponent {
  render() {
    return (
      <Router>
        <div className="window">
          <div className="window-content">
            <div className="pane-group">
              <Drawer />
              <div className="pane">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

Navigation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Navigation
