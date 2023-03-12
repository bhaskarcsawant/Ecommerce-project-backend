const nodeMailer = require('nodemailer');

const sendEmail = async (Options) => {

    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: Options.email,
        subject: Options.subject,
        text: Options.message,
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail