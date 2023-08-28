import * as dotenv from "dotenv";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import {
  getRequiredIntConfig,
  getRequiredStringConfig,
} from "src/utils/config.helper";

/* eslint-disable unicorn/prefer-module */

dotenv.config();

export const emailConfig: SMTPTransport.Options = {
  auth: {
    pass: getRequiredStringConfig("SMTP_PASSWORD"),
    user: getRequiredStringConfig("SMTP_USERNAME"),
  },
  host: getRequiredStringConfig("SMTP_HOST"),
  port: getRequiredIntConfig("SMTP_PORT", 465),
};
