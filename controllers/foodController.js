const { Food } = require('../models/index')
const toRupiah = require('../helper/toRupiah')
class foodController {
    static list(req, res) {
        // res.send('ini list')
        Food.findAll()
            .then((data) => {
                res.render('foods', { data, toRupiah })
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