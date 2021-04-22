export interface BaseUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

// export interface User extends BaseUser {
//   id: string;
// }

export interface OktaUser {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
  },
  credentials: {
    password: {
      value: string;
    },
  },
}
