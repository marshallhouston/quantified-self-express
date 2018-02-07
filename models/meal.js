const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const Meal = {
  findAll: () => {
    return database.raw(
      'SELECT m.*, json_agg(f.*) AS foods FROM meals m INNER JOIN meal_foods mf ON m.id = mf.meal_id INNER JOIN foods f ON mf.food_id = f.id GROUP BY m.id'
    ).then(meals => {
      return meals.rows
    })
  },
}

module.exports = Meal
