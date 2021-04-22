const {Customer} = require('../models/index')


class logController {
    static home(req, res) {
        res.render('home')
    }

    static signIn(req, res) {
        res.send('ini signin')
    }

    static postLogin(req, res) {

    }

    static logOut(req, res) {
        res.send('ini logout')
    }

    static signUp(req, res) {
        // res.send('ini signUp')
        res.render('signup.ejs')
    }

    static postSignUp(req, res) { 
        // console.log(req.body.password);
        // console.log(hash);
        let newCustomer = {
            name: req.body.name,
            password: req.body.password,
            username: req.body.username,
            email: req.body.email,
            money: req.body.money
        }
        Customer.create(newCustomer)
            .then((data)=>{
                res.redirect('/signin')
            })
            .catch((err)=>{
                res.send(err)
            })

    }
}

module.exports = logController