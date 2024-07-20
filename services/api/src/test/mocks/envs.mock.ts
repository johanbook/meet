export function createDummyEnvs(): void {
  process.env["EMAIL"] = "hi@example.com";

  process.env["S3_ACCESS_KEY"] = "my-s3-access-key";
  process.env["S3_ENDPOINT"] = "my-s3-endpoint";
  process.env["S3_PUBLIC_ENDPOINT"] = "my-s3-public-endpoint";
  process.env["S3_SECRET_KEY"] = "my-s3-secret-key";

  process.env["DB_DATABASE"] = "my-db-database";
  process.env["DB_HOST"] = "my-db-host";
  process.env["DB_PASSWORD"] = "my-db-password";
  process.env["DB_USERNAME"] = "my-db-username";

  process.env["SMTP_HOST"] = "my-smtp-host";
  process.env["SMTP_PASSWORD"] = "my-smtp-password";
  process.env["SMTP_USERNAME"] = "my-smtp-username";

  process.env["UI_DOMAIN"] = "localhost";

  // Only used for testing
  process.env["VAPID_PRIVATE_KEY"] =
    "0j9YQ7OrRkhVtnV1CV-A7MH7G3aAwKULxPAIpSPyhXc";
  process.env["VAPID_PUBLIC_KEY"] =
    "BLUZR-sJ_JYCTJ-5mq9_B-0eRTrGVtIKgWIo21eIzhQXMoGvtDlAUQHOjugrTOx-85TSR1c5IIR5y1j4FxV4gGA";
}
