import express, { Request, Response } from 'express';
import * as ListService from "../db/services/lists.service";
// import { BaseUser, OktaUser } from "../interfaces/user.interface";
import { ListDocument } from '../db/models/lists.model';
// import { RequestWithJwt } from '../interfaces/request.interface';
// import fetch from 'node-fetch';
// import oktaClient from '../authentication/oktaClient';
import { authenticationRequired } from '../authentication/authentication';

// import { v4 as uuid } from 'uuid';

export const todosRouter = express.Router();

todosRouter.post('/all', authenticationRequired, async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const list: ListDocument[] = await ListService.findById(userId);
    return res.status(201).json(list);
  } catch (err) {
    res.status(400).json(err.message);
  }
});
