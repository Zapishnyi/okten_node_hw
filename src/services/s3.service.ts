import { randomUUID } from "node:crypto";
import path from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";

import { config } from "../configs/config";
import { ImageDirectoryNameEnum } from "../enums/image-directory-name.enum";

class S3Service {
  constructor(
    private readonly s3Client = new S3Client({
      // forcePathStyle: true,
      region: config.AWS_REGION,
      credentials: {
        accessKeyId: config.AWS_ID,
        secretAccessKey: config.AWS_ACCESS_KEY,
      },
    }),
  ) {}

  public async uploadFile(
    dirName: ImageDirectoryNameEnum,
    _userId: string,
    file: UploadedFile,
  ): Promise<string> {
    const filePath = `${dirName}/${_userId}/${randomUUID()}${path.extname(file.name)}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: config.AWS_BUCKET_NAME,
        Key: filePath,
        Body: file.data,
        ACL: config.AWS_S3_ACL,
        ContentType: file.mimetype,
      }),
    );
    return filePath;
  }

  public async deleteFile(pathToFile: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: config.AWS_BUCKET_NAME,
        Key: pathToFile,
      }),
    );
  }
}
export const s3Service = new S3Service();
