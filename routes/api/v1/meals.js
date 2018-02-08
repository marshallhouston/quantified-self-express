const express = require('express')
const router = express.Router()
const mealsController = require('../../../controllers/mealsController')
const mealFoodsController = require('../../../controllers/mealFoodsController')

router.get('/', mealsController.index)

router.post('/:mealId/foods/:foodId', mealFoodsController.create)

module.exports = router
