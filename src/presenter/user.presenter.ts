import { config } from "../configs/config";
import { IUserUpdated } from "../interfaces/IUser";

class Presenter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public toPresent(user: IUserUpdated | null) {
    let result;
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = JSON.parse(JSON.stringify(user));
      result = rest;
    } else {
      result = user;
    }
    if (result.avatar) {
      result = {
        ...result,
        avatar: config.AWS_END_POINT_URL + "/" + result.avatar,
      };
    }

    result = Object.fromEntries(Object.entries({ ...result }).sort());
    return result;
  }
}
export const { toPresent } = new Presenter();
