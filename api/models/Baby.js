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
    lastfeedamount: {
      type: 'string'
    },
    lastchange: {
      type: 'date'
    },
    lastchangetype: {
      type: 'string'
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
