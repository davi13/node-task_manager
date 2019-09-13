const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: '',
    from: '',
    subject: 'this is my first creation',
    text: 'I hope this one actually get to you.'
})