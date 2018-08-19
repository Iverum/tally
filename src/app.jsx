import React from 'react'
import { Route } from 'react-router-dom'

import Files from './modules/files'
import Navigation from './modules/navigation'

export default class App extends React.Component {
  render() {
    return (
      <Navigation>
        <Route exact path="/" component={Files} />
      </Navigation>
    )
  }
}
