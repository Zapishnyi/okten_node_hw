import { CronJob } from "cron";
import dayjs from "dayjs";

import { oldPasswordsRepository } from "../repositories/old_passwords.repository";

const DeleteOldPasswords = async () => {
  try {
    await oldPasswordsRepository.deleteManyByParams({
      createdAt: { $lte: dayjs().subtract(90, "days").toDate() },
    });
    console.log(
      `Old Passwords are deleted at ${dayjs().format("DD-MM-YY, hh:mm:ss")}`,
    );
  } catch (err) {
    console.log(`${this} crone failed with error:`, err);
  }
};

export const deleteOldPasswords = new CronJob(
  "59 54 3 * * *  ",
  DeleteOldPasswords,
);
