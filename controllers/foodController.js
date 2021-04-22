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
        res.send('ini buy')
    }
}

module.exports = foodController