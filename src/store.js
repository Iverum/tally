import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import database from './modules/database/dux'
import media from './modules/media/dux'

let store = null

function createRootReducer() {
  return combineReducers({
    database,
    media
  })
}

/**
 * Configures a singleton instance of a Redux store.
 * @param {Object} initialState The initial state for the Redux store.
 */
export default function configureStore(initialState = {}) {
  if (store !== null) {
    store.replaceReducer(createRootReducer())
  }

  if (store === null) {
    store = createStore(createRootReducer(), initialState, applyMiddleware(thunk))
  }

  return store
}
