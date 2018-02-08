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

const destroy = (req, res, next) => {
  let mealId = req.params.mealId
  let foodId = req.params.foodId

  MealFood.delete(mealId, foodId)
    .then(response => {
      if(!response || response.length != 2) {
        return res.status(404)
      } else {
        res.status(200).send({
          message: `Successfully removed ${response[1].name} from ${response[0].name}`
        })
      }
  })
}

module.exports = {
  create, destroy
}
