
class logController {
    static home(req, res) {
        res.render('home')
    }

    static signIn(req, res) {
        res.send('ini signin')
    }

    static postLogin(req, res) {

    }

    static logOut(req, res) {
        res.send('ini logout')
    }

    static signUp(req, res) {
        res.send('ini signUp')
    }

    static postSignUp(req, res) {

    }
}

module.exports = logController