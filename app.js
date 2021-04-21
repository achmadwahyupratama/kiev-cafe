const express = require('express')
const mainRouter = require('./routers/mainRouter')
const app = express()
const port = 3000
app.use(express.urlencoded({extended: true}))
app.use( mainRouter )
app.listen(port, ()=>{
    console.log(`Working at port ${port}`);
})