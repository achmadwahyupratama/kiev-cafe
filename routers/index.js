const router = require('express').Router()
const food = require('./foodRouter')
const cust = require('./customerRouter')
const logController = require('../controllers/logController')

router.get('/signin', logController.signIn)
router.post('/sigin', logController.postLogin)

router.get('/logout', logController.logOut)

router.get('/signup', logController.signUp)
router.post('/signup', logController.postSignUp)

router.get('/', logController.home)
router.use('/foods', food)
router.use('/customers', cust)
module.exports = router