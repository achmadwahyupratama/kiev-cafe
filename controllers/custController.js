const { Food, Customer, Order } = require('../models/index')
class custController {
    static listOrder(req, res) {
        // res.send('ini cust controller')
        // console.log(req.session.customerId)
        let id = +req.session.customerId
        Order.findAll({
            include: [Food, Customer]
        })
            .then((data) => {
                console.log(data)
                res.render('listOrder.ejs', {data})
                // res.render('listOrder')
            })
            .catch((err) => {
                res.send(err.message)
            })

            // Customer.findAll({
            //     include: [Food],
            //     where: {
            //         id: req.session.customerId
            //     }
            // })
            //     .then((data)=> {
            //         res.send(data)
            //     })
            //     .catch((err)=>{
            //         res.send(err)
            //     })
    }

    static checkout(req, res) {
        res.send('ini cekout')
    }
    
    static getQtyUpdate(req, res) {
        // res.send('ini apdet')
        res.render('editOrder')
    }

    static postQtyUpdate(req, res) {
    
    }

    static delete(req, res) {
        res.send('ini del')
    }
}

module.exports = custController