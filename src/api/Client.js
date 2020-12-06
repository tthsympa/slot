import methods from './index'

class Client {
  constructor() {
    this.offices = methods.offices(this)
    this.meetings = methods.meetings(this)
    this.rooms = methods.rooms(this)
  }
}

export default new Client()
