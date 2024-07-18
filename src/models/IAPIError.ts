export interface IAPIError extends Error {
  message: string;
  status: number;
}
