
class foodController {
    static list(req, res) {
        res.send('ini list')
    }

    static buy(req, res) {
        res.send('ini buy')
    }
}

module.exports = foodController