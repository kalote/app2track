module.exports={
  attributes: {
    type: {
      type: 'string',
      enum: ['feed', 'change']
    },
    date: {
      type: 'date',
      defaultsTo: new Date(0)
    },
    amount: {
      type: 'string'
    },
    changetype: {
      type: 'string'
    },
    baby: {
      model: 'baby'
    }
  }
}
