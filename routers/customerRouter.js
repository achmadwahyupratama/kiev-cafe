const router = require('express').Router()
const custController = require('../controllers/custController')

router.get('/listOrder', custController.listOrder)
router.get('/checkout', custController.checkout)

router.get('/:FoodId/update/:CustomerId', custController.getQtyUpdate)
router.post('/:FoodId/update/:CustomerId', custController.postQtyUpdate)

router.get('/:FoodId/delete/:CustomerId', custController.delete)
module.exports = router