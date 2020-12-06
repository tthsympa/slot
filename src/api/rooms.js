import mock from './rooms.mock'

export default () => ({
  get: async id => Promise.resolve(mock.get[id]),
})
