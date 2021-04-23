import Sublist from "../models/sublists.model";
// import { BaseSublist } from "../../interfaces/sublist.interface";
// import User from '../models/users.model';

export const findById = (id: string) => Sublist.find({ id });

// export const createList = (list: BaseList) => new Sublist(list).save();
