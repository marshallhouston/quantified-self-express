const express = require('express')
const router = express.Router()
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../../knexfile')[environment]
const database = require('knex')(configuration)

router.get('/', (req, res, next) => {
  database.raw('SELECT * FROM foods')
  .then(foods => {
    if(!foods) {
      return res.sendStatus(404)
    } else {
      res.json(foods.rows)
    }
  })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id

  database.raw('SELECT * FROM foods WHERE foods.id = ?', id)
    .then(food => {
      if(!food) {
        return res.sendStatus(404)
      } else {
        res.json(food.rows[0])
      }
    })
})

router.post('/', (req, res, next) => {
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
      error: "Name and calories are required fields. { food : { name : foodName , calories : foodCalories } } "
    })
  }

  database.raw(
    'INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING *',
    [name, calories]
  ).then( food => {
    res.status(201).json(food.rows[0])
  })
})

module.exports = router
