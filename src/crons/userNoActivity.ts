import { CronJob } from "cron";
import dayjs from "dayjs";

import { config } from "../configs/config";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const UserNoActivity = async () => {
  try {
    const noActivityUsers = await userRepository.findManyByParam({
      createdAt: { $lte: dayjs().subtract(5, "days").toDate() },
    });
    if (noActivityUsers) {
      noActivityUsers.forEach((user) => {
        emailService.sendEmail(EmailTypeEnum.REMIND, user.email, {
          name: user.userName,
          frontUrl: config.FRONT_END_URL,
        });
      });
    }
  } catch (err) {
    console.log(`${this} crone failed with error:`, err);
  }
};

export const userNoActivity = new CronJob("00 00 10 * * *  ", UserNoActivity);
