import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ove2xpj6v26q6a3z@ethereal.email', // generated ethereal user
    pass: 'UWsU3vFS5H5WC3WJRn', // generated ethereal password
  },
});

interface EmailProps {
  to: string;
  subject: string;
  html: string;
}

class SendEmailService {
  public async execute({ to, subject, html }: EmailProps) {
    // create reusable transporter object using the default SMTP transport

    const info = await transporter.sendMail({
      from: 'System', // sender address
      to,
      subject,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

export default SendEmailService;
