import mock from './offices.mock'

function calls() {
  return {
    get: async () => Promise.resolve(mock.get),
  }
}
export default calls
