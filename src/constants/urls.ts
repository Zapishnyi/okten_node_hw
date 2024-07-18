interface IUsersUrls {
  base: string;
  all: string;
  byId: string;
}

export const users: IUsersUrls = {
  base: "/users",
  all: "/",
  byId: "/:userId",
};
