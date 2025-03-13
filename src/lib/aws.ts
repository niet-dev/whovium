"use server";

import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Upload } from "@aws-sdk/lib-storage";
import { nanoid } from "nanoid";

import { resizeImage } from "@/lib/actions";
import { NamedImage, S3BoardImages } from "@/lib/types";

const client = new S3Client({
  region: process.env.AWS_REGION,

  credentials: fromCognitoIdentityPool({
    clientConfig: { region: process.env.AWS_REGION },
    identityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID ?? "",
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
    return uploaded.Location ?? "";
  } catch (e) {
    throw e;
  }
}

export async function uploadBoardImages(
  cover: File,
  images: NamedImage[],
): Promise<S3BoardImages> {
  const path = nanoid();
  const boardImages: S3BoardImages = { path, images: [], cover: "" };

  boardImages.cover = await s3PutObject(boardImages.path, cover);

  for (const image of images) {
    const resizedImage = await resizeImage(image.file);
    const location = await s3PutObject(boardImages.path, resizedImage);
    boardImages.images.push({ name: image.name, path: location });
  }

  return boardImages;
}
