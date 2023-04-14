export function createDummyEnvs(): void {
  console.log("Creating dummy configuration");

  process.env["S3_ACCESS_KEY"] = "noop";
  process.env["S3_ENDPOINT"] = "localhost";
  process.env["S3_SECRET_KEY"] = "noop";
}

createDummyEnvs();
