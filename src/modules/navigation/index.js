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

export default Navigation
