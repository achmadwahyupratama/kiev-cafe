const router = require('express').Router()
const foodController = require('../controllers/foodController')

router.get('/', foodController.list)
router.get('/buy/:id', foodController.buy)
module.exports = router