import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

// Dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// new Email(user, url).sendWelcome();

class Email {
  constructor(user, url, message = ' ') {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.name = user.name;
    this.message = message;
    this.url = url;
    this.from = `EmotioKanis9 <${process.env.EMAIL_FROM}>`;
  }

  // ------------------- CREATE TRANSPORT -------------------
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    // 1) Create transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Activate in gmail "less secure app" option
    });
  }

  // ------------------- SEND EMAIL -------------------
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      name: this.name,
      message: this.message,
    });

    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', '¡Bienvenido a la familia de EmotioKanis9!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Su token de restablecimiento de contraseña (Valido por 10 minutos)'
    );
  }

  async sendContactMail() {
    await this.send('contactMail', 'Correo enviado por formulario de contacto');
  }
}

export default Email;
