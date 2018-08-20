import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import files from './modules/files/dux'

let store = null

function createRootReducer() {
  return combineReducers({
    files
  })
}

export default function configureStore(initialState = {}) {
  if (store !== null) {
    console.log('REPLACING REDUCER')
    store.replaceReducer(createRootReducer())
  }

  if (store === null) {
    console.log('CREATING STORE')
    store = createStore(createRootReducer(), initialState, applyMiddleware(thunk))
  }

  return store
}
