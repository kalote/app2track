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
    baby: {
      model: 'baby'
    }
  }
}
