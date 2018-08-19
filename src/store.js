import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import files from './modules/files/dux'

function createRootReducer() {
  return combineReducers({
    files
  })
}

export default function configureStore(initialState = {}) {
  return createStore(createRootReducer(), initialState, applyMiddleware(thunk))
}
