const bcrypt = require('bcryptjs')
const {Customer} = require('../models/index')


class logController {
    static home(req, res) {
        res.render('home')
    }

    static signIn(req, res) {
        // res.send('ini signin')
        res.render('signin.ejs')
    }

    static postSignIn(req, res) {
        console.log('masukk');
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
                    res.redirect('/signin')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static signOut(req, res) {
        req.session.destroy()
        res.redirect('/signin')
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