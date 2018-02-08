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

  find: (id) => {
    return database.raw(
      'SELECT m.*, json_agg(f.*) AS foods FROM meals m INNER JOIN meal_foods mf ON m.id = mf.meal_id INNER JOIN foods f ON mf.food_id = f.id where m.id = ? GROUP BY m.id',
      [id]
    ).then(meal => {
      return meal.rows[0]
    })
  }
}

module.exports = Meal
