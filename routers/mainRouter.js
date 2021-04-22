const mainRouter = require('express').Router()
mainRouter.get('/')
mainRouter.get('/signin')
mainRouter.post('/signin')
mainRouter.get('/signup')
mainRouter.post('/signup')
mainRouter.get('/menu')
mainRouter.get('/order')

module.exports = mainRouter