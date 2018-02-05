exports.seed = (knex, Promise) => {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories) VALUES (?, ?)',
        ["Banana", 150]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories) VALUES (?, ?)',
        ["Bagel Bites", 650]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories) VALUES (?, ?)',
        ["Grapes", 100]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories) VALUES (?, ?)',
        ["Cookies", 300]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories) VALUES (?, ?)',
        ["Burrito", 800]
      )
    ])
  })
}
