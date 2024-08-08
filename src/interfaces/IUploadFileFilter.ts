export interface IUploadFileFilter {
  [key: string]: { MAX_SIZE: number; MIME_TYPES: string[] };
}
