import mock from './rooms.mock'

function calls() {
  return {
    get: async id => Promise.resolve(mock.get[id]),
  }
}
export default calls
