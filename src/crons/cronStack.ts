import { deleteExpiredAccessPairTokens } from "./deleteExpiredAccessPairTokens.cron";

export const jobRunner = () => {
  deleteExpiredAccessPairTokens.start();
};
