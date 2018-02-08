const Meal = require('../models/meal')

const index = (req, res, next) => {

  Meal.findAll()
  .then(meals => {
    if(!meals) {
      return res.sendStatus(404)
    } else {
      return res.json(meals)
    }
  })
}

const show = (req, res, next) => {
  var id = req.params.id

  Meal.find(id)
  .then(meal => {
    if(!meal) {
      return res.sendStatus(404)
    } else {
      return res.json(meal)
    }
  })
}

module.exports = {
  index, show,
}
