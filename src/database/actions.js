import database from './'
import { markInitialized } from './dux'

/**
 * Initializes the database and marks it as ready in the Redux store.
 */
export const initialize = () => (dispatch) => {
  database.sync()
    .then(() => dispatch(markInitialized()))
}

export default {
  initialize
}
