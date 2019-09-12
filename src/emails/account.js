const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'cia1310@homatil.fr',
    from: 'dante1310@hotmail.com',
    subject: 'this is my first creation',
    text: 'I hope this one actually get to you.'
})