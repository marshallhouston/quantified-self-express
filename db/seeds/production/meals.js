exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO meals (id, name) VALUES (?, ?)',
        [1, "Breakfast"]
      ),
      knex.raw(
        'INSERT INTO meals (id, name) VALUES (?, ?)',
        [2, "Snack"]
      ),
      knex.raw(
        'INSERT INTO meals (id, name) VALUES (?, ?)',
        [3, "Lunch"]
      ),
      knex.raw(
        'INSERT INTO meals (id, name) VALUES (?, ?)',
        [4, "Dinner"]
      )
    ])
  })
}
