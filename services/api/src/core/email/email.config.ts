import * as dotenv from "dotenv";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import {
  getRequiredIntConfig,
  getRequiredStringConfig,
} from "src/utils/config.helper";

dotenv.config();

export const emailConfig: SMTPTransport.Options = {
  auth: {
    pass: getRequiredStringConfig("SMTP_PASSWORD"),
    user: getRequiredStringConfig("SMTP_USERNAME"),
  },
  from: getRequiredStringConfig(
    "SMTP_SYSTEM_SENDER",
    '"Meet" <no-reply@meetly.site>',
  ),
  host: getRequiredStringConfig("SMTP_HOST"),
  port: getRequiredIntConfig("SMTP_PORT", 465),

  // Configurations needed with Mailtrap
  requireTLS: true,
  secure: false,
};
