import dotenv from "dotenv";

dotenv.config();

export const config = {
  APP_PORT: Number(process.env.APP_PORT),
  APP_HOST: process.env.APP_HOST as string,
  MONGO_URI: process.env.MONGO_URI as string,

  FRONT_END_URL: process.env.FRONT_URL as string,

  JWT_ACCESS: process.env.JWT_ACCESS_SECRET as string,
  JWT_ACCESS_EXP: process.env.JWT_ACCESS_EXPIRES_IN as string,

  JWT_REFRESH: process.env.JWT_REFRESH_SECRET as string,
  JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXPIRES_IN as string,

  JWT_ACTION: process.env.JWT_ACTION_SECRET as string,
  JWT_ACTION_EXP: process.env.JWT_ACTION_EXPIRES_IN as string,

  SMTP_SERVER_NAME: process.env.SMTP_SERVER as string,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_ADDRESS: process.env.SMTP_EMAIL as string,
  IMAP: process.env.IMAP_PASS as string,
};
