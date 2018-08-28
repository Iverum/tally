import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Media from './modules/media'
import NewMedia from './modules/media/new'
import MediaView from './modules/media/view'
import Navigation from './modules/navigation'
import configureStore from './store'

const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation>
          <Route exact path="/" component={Media} />
          <Switch>
            <Route path="/new" component={NewMedia} />
            <Route path="/:id" component={MediaView} />
          </Switch>
        </Navigation>
      </Provider>
    )
  }
}
