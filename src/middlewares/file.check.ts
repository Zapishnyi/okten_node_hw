import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { allow } from "../constants/fileAllowConfig";
import { FileTypeEnum } from "../enums/fileType.enum";
import { ApiError } from "../errors/api.error";

class FileCheck {
  public fileCheck(fileType: FileTypeEnum) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (req.files?.[fileType]) {
          const file = req.files[fileType] as UploadedFile;
          switch (true) {
            case file.size > allow[fileType].MAX_SIZE:
              throw new ApiError(
                `File is greater than ${allow[fileType].MAX_SIZE / 1024}kb `,
                400,
              );
              break;
            case !allow[fileType].MIME_TYPES.includes(file.mimetype):
              throw new ApiError("Invalid file type", 400);
              break;
          }
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

export const { fileCheck } = new FileCheck();
