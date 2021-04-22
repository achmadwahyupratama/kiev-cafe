function sendEmail(to, subject, text){
    let nodemailer = require('nodemailer')
    // require('dotenv').config()
  
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        type: 'login',
        user: 'tuandaunplantstore@gmail.com',
        pass: 'tuandaun123',
      }
    })
  
    let mailOptions = {
      from: 'tuandaunplantstore@gmail.com',
      to: `${to}`,
      subject: `${subject}`,
      text: `${text}`
    }
  
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        throw err
      } else {
        return`Email sent: ${info.response}`
      }
    })
  }
  
  
  function send(to, text) {
    let subject = 'Thank You For Coming ^^ By Tuan Daun'
    let email = to
    let message = text
    sendEmail(email, subject, message)
  }
  
  module.exports = send