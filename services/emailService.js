import nodemailer from "nodemailer";
import pug from "pug";
import path from "path";
import { convert } from "html-to-text";

export class EmailService {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = process.env.MAIL_FROM;
  }

  _initTransport() {
    const transportConfig =
      process.env.NODE_ENV !== "development"
        ? {
            // MAILGUN
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS,
            },
          }
        : {
            // MAILTRAP
            host: process.env.MAILTRAP_HOST,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS,
            },
          };

    return nodemailer.createTransport(transportConfig);
  }

  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(process.cwd(), "views", `${template}.pug`),
      { name: this.name, urt: this.url, subject }
    );

    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this._initTransport().sendMail(emailConfig);
  }

  async verifyEmail() {
    await this._send("verify", "Welcome email");
  }
}
