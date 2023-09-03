import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from "nodemailer";

import { emailConfig } from "../../email.config";

interface SendEmailProps {
  receivers: string[];
  subject: string;
  text: string;
}

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport(emailConfig);
  }

  async sendEmail({ receivers, subject, text }: SendEmailProps) {
    if (receivers.length === 0) {
      return;
    }

    return await this.transporter.sendMail({
      from: emailConfig.from,
      to: receivers.join(","),
      subject,
      text,
    });
  }
}
