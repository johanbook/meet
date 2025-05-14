import { readFileSync } from "node:fs";
import path from "node:path";

/* eslint-disable unicorn/prefer-module */

interface CreateEmailProps {
  content: string;
  header: string;
  url: string;
}

export function createEmail({
  content,
  header,
  url,
}: CreateEmailProps): string {
  const template = readFileSync(
    path.join(__dirname, "./email.template.html"),
  ).toString();

  return template
    .replace("{{content}}", content)
    .replace("{{header}}", header)
    .replace("{{url}}", url);
}
