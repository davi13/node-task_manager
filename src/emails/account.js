const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.EMAIL,
        subject: 'thanks for joining in!',
        text: `Welcome to the app, ${name} let me know how you get along with the app`,
    });
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.EMAIL,
        subject: 'why are you leving ?',
        text: `we sorry that you want to leave ${name}, we hope you'll be back soon!`
    })

}
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}