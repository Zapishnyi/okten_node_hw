export interface IAPIError extends Error {
  message: string;
  status: number;
  errorResponse?: {
    index: number;
    code: number;
    errmsg: string;
    keyPattern: any;
    keyValue: any;
  };
  index?: number;
  code?: number;
  keyPattern?: any;
  keyValue?: any;
}
