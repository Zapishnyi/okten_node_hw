import dotenv from "dotenv";

dotenv.config();

export const config = {
  APP_PORT: Number(process.env.APP_PORT),
  APP_HOST: process.env.APP_HOST as string,
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_ACCESS: process.env.JWT_ACCESS_SECRET as string,
  JWT_ACCESS_EXP: process.env.JWT_ACCESS_EXPIRES_IN as string,
  JWT_REFRESH: process.env.JWT_REFRESH_SECRET as string,
  JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXPIRES_IN as string,
};
