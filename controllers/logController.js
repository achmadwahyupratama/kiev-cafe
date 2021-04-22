const bcrypt = require('bcryptjs')
const {Customer} = require('../models/index')


class logController {
    static home(req, res) {
        res.render('home')
    }

    static signIn(req, res) {
        res.render('signin.ejs', {err: ''})
    }

    static postSignIn(req, res) {
        Customer.findOne({
            where: {
                username: req.body.username
            }
        })
            .then((data)=>{
                let passwordValid = bcrypt.compareSync(req.body.password, data.password)
                if (passwordValid) {
                    req.session.isSignedIn = true
                    req.session.username = data.username
                    req.session.customerId = data.id
                    res.redirect('/')
                } else {
                    res.render('signin', {err: "Invalid Password"})
                }
            })
            .catch(err => {
                res.render('signin', {err: 'invalid username'})
            })
    }

    static signOut(req, res) {
        req.session.destroy()
        res.redirect('/signin')
    }

    static signUp(req, res) {
        // res.send('ini signUp')
        res.render('signup.ejs', {err: []})
    }

    static postSignUp(req, res) { 
        let newCustomer = {
            name: req.body.name,
            password: req.body.password,
            username: req.body.username,
            email: req.body.email,
            money: req.body.money
        }
        Customer.create(newCustomer)
            .then(()=>{
                res.redirect('/signin')
            })
            .catch((err)=>{
                if (err.name === 'SequelizeValidationError') {
                    let errValid = []
                    for (let i = 0; i < err.errors.length; i++) {
                        errValid.push(err.errors[i].message)
                    }
                    res.render('signup', {err: errValid})
                }
                res.send(err)
            })

    }
}

module.exports = logController