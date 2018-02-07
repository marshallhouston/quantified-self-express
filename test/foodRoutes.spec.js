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

