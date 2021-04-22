const express = require('express')
const session = require('express-session')
const router = require('./routers/index')
const app = express()
const port = 3000
app.use(session({
        secret: 'antara aku engkau dan code',
        resave: false,
        saveUninitialized: true
    }))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(express.static('public'))
app.listen(port, () => {
    console.log(`Working at port ${port}`);
})