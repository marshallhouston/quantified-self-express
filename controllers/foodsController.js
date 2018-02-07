const Food = require('../models/food')

const index = (req, res, next) => {
  Food.findAll()
    .then(foods => {
      if(!foods) {
        return res.sendStatus(404)
      } else {
        res.json(foods)
      }
  })
}

const show = (req, res, next) => {
  let id = req.params.id

  Food.find(id)
    .then(food => {
      if(!food) {
        return res.sendStatus(404)
      } else {
        res.json(food)
      }
    })
}

const create = (req, res, next) => {
  let food = req.body.food
  if (!food) {
    return res.status(400).send({
      error: "The format should be { food : { name : foodName , calories : foodCalories } }"
    })
  }

  let name = food.name
  let calories = parseInt(food.calories)

  if(!name || !calories) {
    return res.status(400).send({
      error: "Name and calories are required fields. { food : { name : foodName , calories : foodCalories } }"
    })
  }

  Food.create(name, calories)
    .then( food => {
      res.status(201).json(food)
    })
}

const update = (req, res, next) => {

  let food = req.body.food
  if (!food) {
    return res.status(400).send({
      error: "Unsuccessful update. The format should be { food : { name : foodName , calories : foodCalories } }"
    })
  }

  let name = food.name
  let calories = parseInt(food.calories)

  if(!name || !calories) {
    return res.status(400).send({
      error: "Unsuccessful update. Name and calories are required fields. { food : { name : foodName , calories : foodCalories } }"
    })
  }

  let id = req.params.id
  if(!id) {
    return res.status(400).send({
      error: "Unsuccessful update."
    })
  }

  Food.update(id, name, calories)
    .then( food => {
      res.status(200).json(food)
    })
}

module.exports = {index, show, create, update}
