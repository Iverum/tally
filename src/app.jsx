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
        <div>
          <Drawer />
          <Route exact path="/" component={Home}/>
        </div>
      </Router>
    )
  }
}
