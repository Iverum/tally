import React from 'react'
import { Link } from 'react-router-dom'

class Drawer extends React.PureComponent {
  render() {
    return (
      <div className="pane-sm sidebar">
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </div>
    )
  }
}

export default Drawer
