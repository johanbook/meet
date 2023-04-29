import * as dotenv from "dotenv";
import { ClientOptions } from "minio";

import {
  getRequiredBooleanConfig,
  getRequiredIntConfig,
  getRequiredStringConfig,
} from "src/utils/config.helper";

dotenv.config();

interface CustomObjectStorageOptions {
  publicEndpoint: string;
}

export const minioOptions: ClientOptions & CustomObjectStorageOptions = {
  accessKey: getRequiredStringConfig("S3_ACCESS_KEY"),
  endPoint: getRequiredStringConfig("S3_ENDPOINT"),
  publicEndpoint: getRequiredStringConfig("S3_PUBLIC_ENDPOINT"),
  port: getRequiredIntConfig("S3_PORT", 9000),
  secretKey: getRequiredStringConfig("S3_SECRET_KEY"),
  useSSL: getRequiredBooleanConfig("S3_USE_SSL", false),
};
