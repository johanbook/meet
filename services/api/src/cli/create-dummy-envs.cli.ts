export function createDummyEnvs(): void {
  console.log("Creating dummy configuration");

  process.env["S3_ACCESS_KEY"] = "noop";
  process.env["S3_ENDPOINT"] = "noop";
  process.env["S3_SECRET_KEY"] = "noop";

  process.env["DB_DATABASE"] = "noop";
  process.env["DB_HOST"] = "noop";
  process.env["DB_PASSWORD"] = "noop";
  process.env["DB_USERNAME"] = "noop";
}

createDummyEnvs();
