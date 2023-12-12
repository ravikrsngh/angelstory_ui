/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});
console.log(import.meta.env.VITE_AWS_SECRET_KEY)
export const uploadFileToS3 = async (file, bucket_name, filename) => {
  const command = new PutObjectCommand({
    Bucket: bucket_name,
    Key: filename,
    Body: file,
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
