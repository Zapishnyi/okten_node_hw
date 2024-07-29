import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { config } from "../configs/config";
import { emailResponseTree } from "../constants/emailResponceTree";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailToPayloadType } from "../types/email_type_to_payload";

class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_SERVER_NAME,
      port: config.SMTP_PORT,
      secure: true,
      auth: {
        user: config.SMTP_ADDRESS,
        pass: config.IMAP,
      },
      // tls: {
      //   rejectUnauthorized: false,
      // },
      // logger: true, // Enable logging
      // debug: true, // Show debug output
    });
    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".hbs",
          partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
          layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        },
        viewPath: path.join(process.cwd(), "src", "templates", "views"),
        extName: ".hbs",
      }),
    );
  }

  public async sendEmail<T extends EmailTypeEnum>(
    type: T,
    to: string,
    context: EmailToPayloadType[T],
  ): Promise<void> {
    const { subject, template } = emailResponseTree[type];

    const options = {
      from: config.SMTP_ADDRESS,
      to,
      subject,
      template,
      context,
    };
    await this.transporter.sendMail(options);
  }
}
export const emailService = new EmailService();
