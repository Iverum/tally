import React from 'react'
import {
  MemoryRouter as Router,
  Route
} from 'react-router-dom'

import Drawer from './modules/drawer'
import Home from './modules/home'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="window">
          <div className="window-content">
            <div className="pane-group">
              <Drawer />
              <Route exact path="/" component={Home} />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
