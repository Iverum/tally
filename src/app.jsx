import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'

import Files from './modules/files'
import Navigation from './modules/navigation'
import configureStore from './store'

const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation>
          <Route exact path="/" component={Files} />
        </Navigation>
      </Provider>
    )
  }
}
