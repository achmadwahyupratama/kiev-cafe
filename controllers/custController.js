
class custController {
    static listOrder(req, res) {
        res.send('ini cust controller')
    }

    static checkout(req, res) {
        res.send('ini cekout')
    }

    static getQtyUpdate(req, res) {
        res.send('ini apdet')
    }

    static postQtyUpdate(req, res) {
    
    }

    static delete(req, res) {
        res.send('ini del')
    }
}

module.exports = custController