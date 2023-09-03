import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";

import { Logger } from "src/core/logging";

import { emailConfig } from "../../email.config";

interface SendEmailProps {
  receivers: string[];
  subject: string;
  text: string;
}

@Injectable()
export class EmailService {
  private logger = new Logger(EmailService.name);
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport(emailConfig);
  }

  async sendEmail({ receivers, subject, text }: SendEmailProps) {
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
      to: receivers.join(","),
      subject,
      text,
    });
  }
}
