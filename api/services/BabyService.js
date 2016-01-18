module.exports = {
  getBabies: function(owner, next) {
    Baby.find({owner: owner}).exec(function(err, babies) {
      if(err) throw err;
      next(babies);
    })
  },
  addBaby: function(babyVal, next) {
    Baby.create(babyVal).exec(function(err, baby) {
      if(err) throw err;
      next(baby);
    })
  },
  feedBaby: function(data, next) {
    Event.create({type: 'feed', date: new Date(data.when), baby: data.babyId}).exec(function(err, Event) {
      if(err) throw err;
      Baby.find(data.babyId)
        .populate("events")
        .exec(function (err, baby) {
          if(err) throw err;
          baby[0].lastfeed = new Date(data.when);
          baby[0].events.add(Event.id);
          baby[0].save(function(err, res) {
            console.log(res);
            if(err) throw err;
            next(res);
          })
      })
    })
  }
}
