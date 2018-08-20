import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import files from './modules/files/dux'

let store = null

function createRootReducer() {
  return combineReducers({
    files
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
