exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [1, 1]
      ),
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [2, 1]
      ),
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [3, 1]
      ),
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [4, 1]
      ),
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [1, 2]
      ),
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [2, 2]
      ),
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [3, 2]
      ),
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [1, 3]
      ),
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [2, 3]
      ),
      knex.raw(
        'INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)',
        [1, 4]
      ),
    ])
  })
}
