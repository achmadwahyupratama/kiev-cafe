const { Food, Customer, Order } = require('../models')
const toRupiah = require('../helper/toRupiah')
class foodController {
    static list(req, res) {
        Food.findAll({
            order: [['name', 'ASC']]
        })
            .then((data) => {
                console.log(data)
                res.render('foods', { data, toRupiah })
            })
            .catch((err) => {
                console.log(err)
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