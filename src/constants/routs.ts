interface IUsersUrls {
  auth: {
    base: string;
    root: string;
    login: string;
  };
  users: {
    base: string;
    root: string;
    id: string;
  };
  cars: {
    base: string;
    root: string;
    id: string;
  };
}

export const routs: IUsersUrls = {
  auth: {
    base: "/auth",
    root: "/",
    login: "/login",
  },
  users: {
    base: "/users",
    root: "/",
    id: "id",
  },
  cars: {
    base: "/cars",
    root: "/",
    id: "id",
  },
};
