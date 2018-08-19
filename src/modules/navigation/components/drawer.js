import React from 'react'
import { NavLink } from 'react-router-dom'

class Drawer extends React.PureComponent {
  render() {
    return (
      <div className="pane-sm pane-one-fourth sidebar">
        <nav>
            <NavLink
              activeClassName="active"
              className="nav-group-item"
              exact
              to="/"
            >
              <span className="icon icon-archive" style={{ marginTop: 0 }}></span>
              Files
            </NavLink>
        </nav>
      </div>
    )
  }
}

export default Drawer
