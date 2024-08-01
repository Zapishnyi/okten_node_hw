import { deleteExpiredAccessPairTokens } from "./deleteExpiredAccessPairTokens.cron";
import { deleteOldPasswords } from "./deleteOldPasswords.cron";
import { userNoActivity } from "./userNoActivity";

export const jobRunner = () => {
  deleteExpiredAccessPairTokens.start();
  deleteOldPasswords.start();
  userNoActivity.start();
};
