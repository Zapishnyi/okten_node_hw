import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailPayloadType } from "./email_paylod_combined";
import { PickRequired } from "./pick_required_type";

export type EmailToPayloadType = {
  [EmailTypeEnum.WELCOME]: PickRequired<
    EmailPayloadType,
    "name" | "actionToken" | "frontUrl"
  >;
  [EmailTypeEnum.LOG_OUT]: PickRequired<EmailPayloadType, "name" | "frontUrl">;
  [EmailTypeEnum.PASSWORD_CHANGED]: PickRequired<
    EmailPayloadType,
    "name" | "frontUrl"
  >;

  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailPayloadType,
    "name" | "actionToken" | "frontUrl"
  >;
};
