import configureStore from '../store'

describe('src/store.js', () => {
  let store = null
  it('should return a store', () => {
    store = configureStore()
    expect(store).toBeTruthy()
  })

  it('should return the same store every time', () => {
    expect(configureStore()).toStrictEqual(store)
  })
})
