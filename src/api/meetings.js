import mock from './meetings.mock'

export default () => ({
  getAll: async id => Promise.resolve(mock),
  get: async id => Promise.resolve(mock[id]),
  add: async (id, booking) => {
    await new Promise(resolve => {
      setTimeout(() => {
        mock[id].push({
          id: 0,
          office: booking.office,
          owner: booking.email,
          title: booking.subject,
          room: booking.room,
          start: booking.slot.start,
          end: booking.slot.end,
          allDay: false,
          options: [],
        })
        resolve(mock[id])
      }, 2000)
    })
  },
})
