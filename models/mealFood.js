const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const MealFood = {
  create: (mealId, foodId) => {
    return database.raw(
      'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?) RETURNING *',
      [mealId, foodId]
    ).then(mealFood => {
      return database.raw(
        'SELECT m.name AS meal_name, f.name AS food_name FROM foods f INNER JOIN meal_foods mf ON mf.food_id = f.id INNER JOIN meals m ON mf.meal_id = m.id WHERE m.id = ? AND f.id = ? LIMIT 1', [mealId, foodId]
    ).then(mealFoodInfo => {
      return mealFoodInfo.rows[0]
      })
    })
  },

  delete: (mealId, foodId) => {
    return database.raw(
      'DELETE FROM meal_foods WHERE meal_foods.meal_id = ? AND meal_foods.food_id = ? RETURNING *',
      [mealId, foodId]
    ).then((response) => {
      // var pry = require('pryjs'); eval(pry.it)
      return database.raw('SELECT meals.name FROM meals WHERE meals.id = ? UNION SELECT foods.name FROM foods WHERE foods.id = ?',
      [mealId, foodId]
    ).then(mealAndFoodNames => {
      return mealAndFoodNames.rows
      })
    })
  }
}

module.exports = MealFood
