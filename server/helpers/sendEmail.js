var nodemailer = require('nodemailer');
require("dotenv").config()
const email = process.env.EMAIL
const password = process.env.PASSWORD

function sendEmail(person, msg) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: email,
            pass: password
        }
    });

    var mailOptions = {
        from: email,
        to: `${person}`,
        subject: 'fancy todo oreavas',
        text: msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}



module.exports=sendEmail


