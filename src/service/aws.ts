/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import Cookies from "js-cookie";

const client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});
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

export const uploadFiles = async (files) => {
  const urlList = [];
  const uploadPromises = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    uploadPromises.push(
      uploadFileToS3(
        file,
        `${import.meta.env.VITE_AWS_STORAGE_BUCKET_NAME}`,
        `users/${Cookies.get("user")}/project/images/${file.name.replaceAll(
          " ",
          "_"
        )}`
      )
    );
  }
  await Promise.all(uploadPromises);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const assetUrl = `https://${
      import.meta.env.VITE_AWS_STORAGE_BUCKET_NAME
    }.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/users/${Cookies.get(
      "user"
    )}/project/images/${file.name.replaceAll(" ", "_")}`;
    console.log(assetUrl);
    console.log(file);
    urlList.push({
      file: file,
      url: assetUrl,
    });
  }
  return urlList;
};

export const uploadRandomFiles = async (files) => {
  const urlList = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    await uploadFileToS3(
      file.file,
      `${import.meta.env.VITE_AWS_STORAGE_BUCKET_NAME}`,
      `users/${Cookies.get("user")}/project/images/${file.name.replaceAll(
        " ",
        "_"
      )}`
    );
    const assetUrl = `https://${
      import.meta.env.VITE_AWS_STORAGE_BUCKET_NAME
    }.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/users/${Cookies.get(
      "user"
    )}/project/images/${file.name.replaceAll(" ", "_")}`;
    console.log(assetUrl);
    console.log(file);
    urlList.push({
      file: file,
      url: assetUrl,
    });
  }
  return urlList;
};
