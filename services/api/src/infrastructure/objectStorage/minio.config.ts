import * as dotenv from "dotenv";
import { ClientOptions } from "minio";

dotenv.config();

function getConfig(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Required environment variable '${key}' is undefined`);
  }

  return value;
}

export const minioOptions: ClientOptions = {
  accessKey: getConfig("S3_ACCESS_KEY"),
  endPoint: getConfig("S3_ENDPOINT"),
  port: Number.parseInt(process.env.S3_PORT || "9000"),
  secretKey: getConfig("S3_SECRET_KEY"),
  useSSL: Boolean(process.env.S3_USE_SSL),
};
