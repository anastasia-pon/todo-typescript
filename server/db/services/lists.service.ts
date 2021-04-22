import List from "../models/lists.model";
// import { BaseUser } from "../../interfaces/user.interface";
// import User from '../models/users.model';

export const findById = (userId: string) => List.find({ userId });

// export const createUser = (user: BaseUser) => new User(user).save();