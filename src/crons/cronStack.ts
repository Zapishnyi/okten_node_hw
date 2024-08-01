import { deleteExpiredAccessPairTokens } from "./deleteExpiredAccessPairTokens.cron";
import { deleteOldPasswords } from "./deleteOldPasswords.cron";

export const jobRunner = () => {
  deleteExpiredAccessPairTokens.start();
  deleteOldPasswords.start();
};
