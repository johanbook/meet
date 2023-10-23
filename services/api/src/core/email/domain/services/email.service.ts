import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";

import { Logger } from "src/core/logging";

import { emailConfig } from "../../email.config";
import { createEmail } from "./email.template";

interface SendEmailProps {
  receivers: string[];
  subject: string;
  text: string;
  url: string;
}

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport(emailConfig);
  }

  async sendEmail({ receivers, subject, text, url }: SendEmailProps) {
    if (receivers.length === 0) {
      return;
    }

    this.logger.debug({
      msg: "Sending email",
      subject,
      numReceivers: receivers.length,
    });

    return await this.transporter.sendMail({
      from: emailConfig.from,
      html: createEmail({
        content: text,
        header: subject,
        url,
      }),
      to: receivers.join(","),
      subject,
      text,
    });
  }
}
