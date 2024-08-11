import { config } from "../configs/config";
import { IPaginationResult } from "../interfaces/IPaginated";
import { IUserPresented, IUserUpdated } from "../interfaces/IUser";

class Presenter {
  public toPresentUser(user: IUserUpdated | null): IUserPresented {
    return {
      _id: user?._id,
      userName: user?.userName,
      email: user?.email,
      role: user?.role,
      name: user?.name,
      age: user?.age,
      phone: user?.phone,
      avatar: user?.avatar
        ? config.AWS_END_POINT_URL + "/" + user.avatar
        : undefined,
      gender: user?.gender,
      isVerified: user?.isVerified,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
  }

  public toPresentPaginated<J, K>(
    query: IPaginationResult<J, K>,
  ): IPaginationResult<J, K> {
    return {
      limit: query.limit,
      page: query.page,
      total: query.total,
      order: query.order,
      orderBy: query.orderBy,
      search: query.search,
      data: query.data,
    };
  }
}
export const { toPresentPaginated, toPresentUser } = new Presenter();
