// The list of User objects. 
const usersArray =[{
    id: 'u1',
    name: 'Alice',
    mails: [
      {
        id: 'm-u1-1',
        from: 'u1',
        to: 'u2',
        subject: 'Meeting update',
        body: 'Let’s reschedule the meeting to next week.',
        labelIds: [],
        links: [],
        time: '2024-06-01T09:00:00.000Z'
      },
      {
        id: 'm-u2-1',
        from: 'u2',
        to: 'u1',
        subject: 'RE: Meeting update',
        body: 'Next week works for me. Thanks!',
        labelIds: [],
        links: [],
        time: '2024-06-01T10:00:00.000Z'
      },
      {
        id: 'm-u1-2',
        from: 'u1',
        to: 'u2',
        subject: 'Follow-up',
        body: 'Here’s the document we discussed.',
        labelIds: [],
        links: [],
        time: '2024-06-02T08:30:00.000Z'
      }
    ]
  },
  {
    id: 'u2',
    name: 'Bob',
    mails: [
      {
        id: 'm-u1-1',
        from: 'u1',
        to: 'u2',
        subject: 'Meeting update',
        body: 'Let’s reschedule the meeting to next week.',
        labelIds: [],
        links: [],
        time: '2024-06-01T09:00:00.000Z'
      },
      {
        id: 'm-u2-1',
        from: 'u2',
        to: 'u1',
        subject: 'RE: Meeting update',
        body: 'Next week works for me. Thanks!',
        labelIds: [],
        links: [],
        time: '2024-06-01T10:00:00.000Z'
      },
      {
        id: 'm-u1-2',
        from: 'u1',
        to: 'u2',
        subject: 'Follow-up',
        body: 'Here’s the document we discussed.',
        labelIds: [],
        links: [],
        time: '2024-06-02T08:30:00.000Z'
      }
    ]
  }
]

module.exports = usersArray
