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

module.exports = {
  index,
}
