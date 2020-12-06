const now = new Date()

const meetings = {
  1234: [
    {
      id: 14,
      office: 'Paris',
      owner: 'thuart@online.net',
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
      room: 'Room1',
      options: [],
    },
    {
      id: 15,
      office: 'Paris',
      owner: 'thuart@online.net',
      title: 'Point in Time Event',
      start: now,
      end: now,
      room: 'Room1',
      options: [],
    },
  ],
  5678: [
    {
      id: 14,
      office: 'Paris',
      owner: 'thuart@online.net',
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
      room: 'Room1',
      options: [],
    },
    {
      id: 15,
      office: 'Paris',
      owner: 'thuart@online.net',
      title: 'Point in Time Event',
      start: now,
      end: now,
      room: 'Room1',
      options: [],
    },
  ],
  8912: [],
}
export default meetings
