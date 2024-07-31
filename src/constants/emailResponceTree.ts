import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailResponseTree = {
  [EmailTypeEnum.WELCOME]: {
    subject: "Welcome",
    template: "welcome",
  },
  [EmailTypeEnum.LOG_OUT]: {
    subject: "Hope see you soon",
    template: "log_out",
  },
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    subject: "Password recovery",
    template: "forgot_password",
  },
  [EmailTypeEnum.PASSWORD_RENEWED]: {
    subject: "Password renewed",
    template: "password_renewed",
  },
};
