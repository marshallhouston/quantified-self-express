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
module.exports = router
