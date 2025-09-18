const nodemailer = require("nodemailer");
require("dotenv").config();


exports.mailSender = async (email,title,body) => {

    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        }
    })

    let mailOptions = {
        from: '"Your Name" <contact@surajdiamond.com>',
        to: email,
        subject: title,
        text: body,
    };

    let info = await transporter.sendMail(mailOptions);
}