import mock from './offices.mock'

export default () => ({
  get: async () => Promise.resolve(mock.get),
})
