const nodemailer = require("nodemailer");
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_SECRET,
      },
    });
  }

  async sendMails(mails, content) {
    for (let index = 0; index < mails.length; index++) {
      await this.transporter.sendMail({
        from: process.env.MAIL_USER,
        to: mails[i],
        subject: content.title,
        text: content.text,
      });
    }
  }

  async sendMail(to, content) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: content.title,
      text: content.text,
    });
  }
}

module.exports = new MailService();
