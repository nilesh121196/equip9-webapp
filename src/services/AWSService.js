import AWS from "aws-sdk";
import { devEnv } from "../config";

export const S3 = new AWS.S3({
  accessKeyId: devEnv.accessKeyId,
  secretAccessKey: devEnv.secretAccessKey,
  region: devEnv.region,
});
