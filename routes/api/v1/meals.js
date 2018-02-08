const express = require('express')
const router = express.Router()
const mealsController = require('../../../controllers/mealsController')

router.get('/', mealsController.index)

router.get('/:id/foods', mealsController.show)

module.exports = router
