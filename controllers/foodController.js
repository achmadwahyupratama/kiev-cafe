const { Food, Customer, Order } = require('../models/index')
const toRupiah = require('../helper/toRupiah')
class foodController {
    static list(req, res) {
        // res.send('ini list')
        let food
        Food.findAll()
            .then((data) => {
                // console.log(data)
                // res.render('foods', { data, toRupiah })
                food = data
                console.log(food)
                return Customer.findByPk(req.session.customerId)
            })
            .then((cust) => {
                console.log(cust)
                res.render('foods', {food, cust, toRupiah
                })
            })
            .catch((err) => {
                res.send(err.message)
            })
    }

    static buy(req, res) {
        const id = +req.params.id
        Food.findByPk(id)
            .then((data) => {
                data.decrement('stock')
                // res.send(data)
                res.redirect('/foods')
            })
            .catch((err) => {
                res.send(err.message)
            })
    }
}

module.exports = foodController