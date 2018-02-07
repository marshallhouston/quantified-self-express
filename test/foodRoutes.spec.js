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

  describe('GET /api/v1/foods', () => {
    it('should return all foods as json in an array', () => {
      return chai.request(server)
      .get('/api/v1/foods')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body[0].should.have.property('id')
        response.body[0].should.have.property('name')
        response.body[0].should.have.property('calories')
      }).catch(error => {
        throw error
      })
    })
  })

  describe('GET /api/v1/foods/:id', () => {
    it('should return a single food as json', () => {
      return chai.request(server)
      .get('/api/v1/foods/3')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.id.should.equal(3)
        response.body.should.have.property('name')
        response.body.name.should.be.a('string')
        response.body.should.have.property('calories')
        response.body.calories.should.be.a('number')
      }).catch(error => {
        throw error
      })
    })
  })

  describe('POST /api/v1/foods', () => {
    it('should create a new food and return it as json', () => {
      return chai.request(server)
      .post('/api/v1/foods')
      .send({ food : { name: 'Turtle Ice Cream', calories: 235 } })
      .then(response => {
        response.should.have.status(201)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.should.have.property('name')
        response.body.name.should.equal('Turtle Ice Cream')
        response.body.should.have.property('calories')
        response.body.calories.should.equal(235)
      })
    })
  })

  describe('PUT /api/v1/foods/:id', () => {
    it('should update the food and return it as json', () => {
      return chai.request(server)
      .put('/api/v1/foods/2')
      .send({ food : { name: 'Coffee', calories: 75 } })
      .then(response => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.id.should.equal(2)
        response.body.should.have.property('name')
        response.body.name.should.equal('Coffee')
        response.body.should.have.property('calories')
        response.body.calories.should.equal(75)
      })
    })
  })
})
