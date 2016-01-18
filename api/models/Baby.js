module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    gender: {
      type: 'string',
      enum: ['Male','Female']
    },
    lastfeed: {
      type: 'date'
    },
    lastchange: {
      type: 'date'
    },
    events: {
      collection: 'event',
      via: 'baby'
    },
    owner: {
      model: 'user'
    }
  }
};
