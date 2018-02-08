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
      .catch( error => {
        throw error
      })
    })
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
})
