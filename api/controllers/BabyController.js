module.exports = {
  getBabies: function(req, res) {
    var owner = req.param("id")
    BabyService.getBabies(owner, function(babies) {
      res.json(babies)
    })
  },
  addBaby: function(req, res) {
    var babyVal = {
      name: req.body.name,
      owner: req.body.owner,
      gender: req.body.gender
    }
    BabyService.addBaby(babyVal, function(success) {
      res.json(success)
    })
  },
  feedBaby: function(req, res) {
    var data = {
      babyId: req.body.baby,
      when: req.body.when,
      quantity: req.body.quantity
    }
    BabyService.feedBaby(data, function(success) {
      res.json(success)
    })
  }
}
