/**
 * Data Model Interfaces
 */
// import { BaseUser, User } from "../../interfaces/user.interface";
import { UserDocument } from "../models/users.model";
import { BaseUser } from "../../interfaces/user.interface";
import User from '../models/users.model';

export const findUserByEmail = (email: string) => User.find({ email });

export const createUser = (user: BaseUser) => new User(user).save();

/**
 * In-Memory Store
 * instead of the db for now
 */

// const users: Users = [
//   {
//     id: '1',
//     email: "userone@test.com",
//     password: '12345',
//     firstName: "Joe",
//     lastName: "Doe"
//   },
//   {
//     id: '2',
//     password: '67890',
//     email: "usertwo@test.com",
//     firstName: "Jane",
//     lastName: "Doe"
//   },
// ];

/**
 * Service Methods
 */

// export const findAll = async (): Promise<User[]> => Object.values(users);

// export const find = async (id: string): Promise<User | undefined> => users.find(u => u.id === id);

// export const findUserByEmail = async (email: string): Promise<User | undefined> => users.find(u => u.email === email);

// export const create = async (newUser: BaseUser): Promise<User> => {
//   const id = uuid();

//   users[users.length] = {
//     id,
//     ...newUser,
//   };

//   return users[users.length - 1];
// };

// export const update = async (
//   id: string,
//   userUpdate: BaseUser
// ): Promise<User | null> => {
//   const user = await find(id);

//   if (!user) {
//     return null;
//   }
//   const index = users.indexOf(user);
//   users[index] = { id, ...userUpdate };

//   return users[index];
// };

// export const remove = async (id: string): Promise<null | void> => {
//   const user = await find(id);

//   if (!user) {
//     return null;
//   }
//   const index = users.indexOf(user);
//   delete users[index];
// };
