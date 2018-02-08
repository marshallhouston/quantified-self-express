const MealFood = require('../models/mealFood')

const create = (req, res, next) => {
  let mealId = req.params.mealId
  let foodId = req.params.foodId

  MealFood.create(mealId, foodId)
  .then(mealFood => {
    if(!mealFood) {
      return res.sendStatus(404)
    } else {
      res.status(201).send({
        message: `Successfully added ${mealFood.food_name} to ${mealFood.meal_name}`
      })
    }
  })
}

module.exports = {
  create,
}
