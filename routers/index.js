const router = require('express').Router()
const food = require('./foodRouter')
const cust = require('./customerRouter')
const logController = require('../controllers/logController')
const isSignedIn = require('../middlewares/isSignedIn')

router.get('/signin', logController.signIn)
router.post('/signin', logController.postSignIn)

router.get('/signout', logController.signOut)

router.get('/signup', logController.signUp)
router.post('/signup', logController.postSignUp)

router.get('/', logController.home)
router.use('/foods', isSignedIn, food)
router.use('/customers',isSignedIn, cust)
module.exports = router