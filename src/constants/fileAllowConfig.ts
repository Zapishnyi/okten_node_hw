import { IUploadFileFilter } from "../interfaces/IUploadFileFilter";

export const allow: IUploadFileFilter = {
  avatar: {
    MAX_SIZE: 100 * 1024,
    MIME_TYPES: [
      "image/apng",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/avif",
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/webp",
    ],
  },
};
