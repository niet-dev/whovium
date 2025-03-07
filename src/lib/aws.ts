"use server";

import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Upload } from "@aws-sdk/lib-storage";

const client = new S3Client({
  region: process.env.AWS_REGION,

  credentials: fromCognitoIdentityPool({
    clientConfig: { region: process.env.AWS_REGION },
    identityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
  }),
});
const Bucket = process.env.AWS_S3_BUCKET;

export async function listS3BucketObjects() {
  const command = new ListObjectsCommand({ Bucket });
  const { Contents } = await client.send(command);
  const contentsList = Contents?.map((c) => `${c.Key}`).join("\n");
  console.log(contentsList);
}

export async function s3PutObject(path: string, file: File) {
  try {
    const uploader = new Upload({
      client,
      leavePartsOnError: false,
      params: { Bucket, Key: `${path}/${file.name}`, Body: file },
    });

    const uploaded = await uploader.done();
    return uploaded.Location;
  } catch (e) {
    throw e;
  }
}
