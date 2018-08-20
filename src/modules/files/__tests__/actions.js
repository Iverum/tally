import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { getFiles } from '../actions'
import { ADD_FILE } from '../dux'

jest.mock('fs', () => ({
  readdirAsync: () => Promise.resolve(['test.png', 'test.jpg'])
}))

const mockStore = configureMockStore([thunk])

describe('src/modules/files/actions.js', () => {
  it('should dispatch action to add files to store', () => {
    const expectedActions = [{
      type: ADD_FILE,
      fileName: ['test/taggables/test.png', 'test/taggables/test.jpg']
    }]
    const store = mockStore({ files: [] })

    return store.dispatch(getFiles())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
