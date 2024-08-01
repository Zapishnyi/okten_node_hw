import { CronJob } from "cron";
import dayjs from "dayjs";

import { config } from "../configs/config";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { authTokenRepository } from "../repositories/auth_token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const UserNoActivity = async () => {
  try {
    const noActivityUsersId = (
      await authTokenRepository.findManyByParams({
        createdAt: {
          $lt: dayjs().subtract(5, "days").toDate(),
          $gt: dayjs().subtract(6, "days").toDate(),
        },
      })
    )?.map((e) => e._userId);
    if (noActivityUsersId) {
      for (const id of noActivityUsersId) {
        const user = await userRepository.findOneById(id);
        if (user) {
          await emailService.sendEmail(EmailTypeEnum.REMIND, user.email, {
            name: user.userName,
            frontUrl: config.FRONT_END_URL,
          });
        }
      }
    }
  } catch (err) {
    console.log(`${this} crone failed with error:`, err);
  }
};

export const userNoActivity = new CronJob("00 00 10 * * *  ", UserNoActivity);
