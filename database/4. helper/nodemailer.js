const nodemailer = require("nodemailer");


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user : 'budiganthana22@gmail.com',
        pass : 'fudncjowoefucnal'
    },
    tls : {
        rejectUnauthorized :false
    }
})

module.exports = transporter