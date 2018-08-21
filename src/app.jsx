import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'

import Media from './modules/media'
import Navigation from './modules/navigation'
import configureStore from './store'

const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation>
          <Route exact path="/" component={Media} />
        </Navigation>
      </Provider>
    )
  }
}
