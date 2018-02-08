const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile.js')[environment]
const database = require('knex')(configuration)
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../app.js')

chai.use(chaiHttp)

describe('API routes', () => {

  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch(error => {
      throw error
    })
    .done()
  })

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch(error => {
      throw error
    })
    .done()
  })

  describe('GET /api/v1/meals', () => {
    it('should return all meals and the associated foods', () => {
      return chai.request(server)
      .get('/api/v1/meals')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body[0].should.have.property('id')
        response.body[0].id.should.equal(1)
        response.body[0].should.have.property('name')
        response.body[0].name.should.equal("Breakfast")
        response.body[0].should.have.property('foods')
        response.body[0].foods.length.should.equal(4)
        response.body[1].should.have.property('id')
        response.body[1].id.should.equal(2)
        response.body[1].name.should.equal("Snack")
        response.body[1].foods.length.should.equal(3)
        response.body[2].id.should.equal(3)
        response.body[2].name.should.equal("Lunch")
        response.body[2].foods.length.should.equal(2)
        response.body[3].id.should.equal(4)
        response.body[3].name.should.equal("Dinner")
        response.body[3].foods.length.should.equal(1)
      })
  describe('POST /api/v1/meals/:meal_id/foods/:id', () => {
    it('creates a new record in the meal_foods table and returns a successful message', () => {
      return chai.request(server)
      .post(`/api/v1/meals/2/foods/5`)
      .then(response => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.message.should.include(`Successfully added`)
      })
      .catch( error => {
        throw error
      })
    })
  })

  describe('GET /api/v1/meals/:meal_id/foods', () => {
    it('should return an array of all foods related to a given meal', () => {
      return chai.request(server)
      .get('/api/v1/meals/1/foods')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.id.should.equal(1)
        response.body.should.have.property('name')
        response.body.name.should.equal("Breakfast")
        response.body.should.have.property('foods')
        response.body.foods.should.be.a('array')
        response.body.foods[0].should.be.a('object')
        response.body.foods[0].should.have.property('id')
        response.body.foods[0].should.have.property('name')
        response.body.foods[0].name.should.be.a('string')
        response.body.foods[0].should.have.property('calories')
        response.body.foods[0].calories.should.be.a('number')
      }).catch(error => {
        throw error
      })
    })

    it('should return a 404 for meal records that do not exist', () => {
      return chai.request(server)
      .get('/api/v1/meals/8/foods')
      .then(response => {
        response.should.have.status(404)
      }).catch(error => {
        throw error
      })
    })
  })
})
