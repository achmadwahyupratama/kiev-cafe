const { Food, Customer, Order } = require('../models/index')
const toRupiah = require('../helper/toRupiah')
class foodController {
    static list(req, res) {
        let food
        Food.findAll()
            .then((data) => {
                food = data
                return Customer.findByPk(req.session.customerId)
            })
            .then((cust) => {
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
            })
            .then((data)=>{
                return Order.addToList(req.session.customerId, id)
            })
            .then((data)=>{
                res.redirect('/foods')
            })
            .catch((err) => {
                res.send(err.message)
            })
    }
}

module.exports = foodController