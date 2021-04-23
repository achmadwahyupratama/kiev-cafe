const { Food, Customer, Order } = require('../models/index')
const toRupiah = require('../helper/toRupiah')
const nodemailer = require('../helper/nodemailer')
class custController {
    static listOrder(req, res) {
        Order.findAll({
            include: [Food, Customer]
        })
            .then((data) => {
                console.log(data)
                // res.send(data)
                res.render('listOrder.ejs', {data, toRupiah})
            })
            .catch((err) => {
                res.send(err.message)
            })
    }

    
    static getQtyUpdate(req, res) {
        console.log(req.params)
        Order.findAll({
            include: [Food, Customer],
            where: {
                FoodId: req.params.FoodId, CustomerId: req.session.customerId
            }
        })
        // Order.findOne({where: {
        //     FoodId: req.params.FoodId, CustomerId: req.session.customerId
        // }})
        .then((data) => {
            // res.send(data)
            res.render('editOrder', {data})
        })
        .catch((err) => {
            res.send(err.message)
        })
    }

    static postQtyUpdate(req, res) {
        // console.log('masuk11')
        // console.log(req.params)
        // console.log(req.body, 'ini')
        const quantity = req.body.quantity
        Order.update({OrderedQty: quantity}, {where: {FoodId: +req.params.FoodId, CustomerId: +req.params.customerId}})
        .then((data) =>{
            // console.log(data)
            // res.send(data)
            // console.log(data,'>>>>>>>')
            return Food.findByPk(+req.params.FoodId)
        })
        .then((data) => {
            // console.log(data, '<<<<<<')
            return Food.update({stock: data.stock - quantity}, {where: {id: +req.params.FoodId}})
        })
        .then(() => { 
            res.redirect('/customers/listOrder')
        })
        .catch((err) => {
            console.log(err)
            res.send(err.message)
        })
    }
    
    static delete(req, res) {
        // res.send('ini del')
        // console.log(req.params)
        Order.destroy({
            where: {
                FoodId: req.params.FoodId,
                CustomerId: req.params.CustomerId
            }
        })
        .then(() => {
            res.redirect('/customers/listOrder')
        })
        .catch((err) => {
            res.send(err.message)
        })
    }

    static checkout(req, res) {
        // res.send('ini cekout')
        // console.log('masukk uuuu')
        let foodName = []
        console.log(req.session)
        Order.findAll({include: Food, where: {CustomerId: req.session.customerId}})
            .then((data) => {
                for(let i = 0; i < data.length; i++) {
                    foodName.push(data[i].Food.name)
                }
                return Customer.findByPk(+req.session.customerId)
            })
            .then((data) => {
                // res.send(data)
                // console.log(data, 'ini <<<<')
                let text = `here are the name of food you bought ${foodName}` 
                console.log(data.dataValues.email)
                nodemailer(data.dataValues.email, text)
                return Order.destroy({where: {CustomerId: +req.session.customerId}})
            })
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err.message)
            })

    }
}

module.exports = custController