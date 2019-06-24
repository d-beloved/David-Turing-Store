import emailTemplate from '../utils/emailTemplate';

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class MailingController {
  static sendMail(email, receiptUrl) {
    const msg = {
      to: email,
      from: 'noreply@shopmate.com',
      subject: 'Thanks for shopping with Us',
      html: emailTemplate.confirmation(receiptUrl),
    };
    sgMail.send(msg);
  }
}

export default MailingController;