import dotenv from "dotenv";

dotenv.config();

export const config = {
  APP_PORT: Number(process.env.APP_PORT),
  APP_HOST: process.env.APP_HOST as string,
  MONGO_URI: process.env.MONGO_URI as string,
};
