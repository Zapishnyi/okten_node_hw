import { CronJob } from "cron";
import dayjs from "dayjs";

import { config } from "../configs/config";
import { expTimeConverter } from "../helpers/time.helper";
import { authTokenRepository } from "../repositories/auth_token.repository";

const expiredTokensDelete = async () => {
  try {
    await authTokenRepository.deleteManyByParams({
      createdAt: { $lte: expTimeConverter(config.JWT_REFRESH_EXP) },
    });
    console.log(
      `ExpiredTokens Deleted at ${dayjs().format("DD-MM-YY, hh:mm:ss")}`,
    );
  } catch (err) {
    console.log(`${this} crone failed with error:`, err);
  }
};

export const deleteExpiredAccessPairTokens = new CronJob(
  "59 59 3 * * *  ",
  expiredTokensDelete,
);
