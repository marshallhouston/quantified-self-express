const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const Food = {
  findAll: () => {
    return database.raw(
      'SELECT * FROM foods'
    ).then(foods => {
      return foods.rows
    })
  },

  find: (id) => {
    return database.raw(
      'SELECT * FROM foods WHERE foods.id = ?', id
    ).then(food => {
      return food.rows[0]
    })
  },

  create: (name, calories) => {
    return database.raw(
      'INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING *',
      [name, calories]
    ).then(food => {
      return food.rows[0]
    })
  },

  update: (id, name, calories) => {
    return database.raw(
      'UPDATE foods SET name = ?, calories = ? WHERE id = ? RETURNING *',
      [name, calories, id]
    ).then(food => {
      return food.rows[0]
    })
  },

  destroy: (id) => {
    return database.raw(
      'DELETE FROM foods WHERE id = ? RETURNING *', id
    ).then(food => {
      return food.rows
    })
  },

  hasMeals: (id) => {
    return database.raw(
      'SELECT f.id FROM foods f INNER JOIN meal_foods mf ON f.id = mf.food_id WHERE f.id = ?', id
    ).then(foods => {
      return foods.rows.length
    }).catch(error => {
      throw error
    })
  },
}


module.exports = Food
