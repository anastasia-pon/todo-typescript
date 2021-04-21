/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as UserService from "../db/services/users.service";
import { BaseUser, OktaUser } from "../interfaces/user.interface";
import { UserDocument } from "../db/models/users.model";
import { RequestWithJwt } from '../interfaces/request.interface';
// import fetch from 'node-fetch';
import oktaClient from '../authentication/oktaClient';
import { authenticationRequired } from '../authentication/authentication';

import { v4 as uuid } from 'uuid';

/**
 * Router Definition
 */
export const usersRouter = express.Router();
// const oktaUrl = process.env.OKTA_ORG_URL || 'noOktaUrl';
// const oktaToken = 'noOktaToken' || process.env.OKTA_TOKEN;
/**
 * Controller Definitions
 * If you ever need to use a database like MongoDB or PostgreSQL
 * to persist data, you only need to modify the logic of the service provider,
 * the ItemService module, and not the logic of the consumers, your controllers.
 */

// GET items

// usersRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const users: User[] = await UserService.findAll();

//     res.status(200).send(users);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

usersRouter.post('/user', authenticationRequired, async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user: UserDocument[] = await UserService.findUserByEmail(email);
    if (user.length === 0) {
      throw new Error('User not found!');
    }
    return res.status(201).json(...user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

usersRouter.post('/', async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    const err = new Error('Missing user information');
    return res.status(500).json(err.message);
  }

  const userMatch: UserDocument[] = await UserService.findUserByEmail(email);
  if (userMatch.length > 0) {
    const err = new Error('User with this email already exists!');
    return res.status(400).json(err.message);
  }

  try {
    const oktaUser: OktaUser = {
      profile: {
        firstName,
        lastName,
        email,
        login: email,
      },
      credentials: {
        password: {
          value: password,
        },
      },
    };
    const oktaResponse = await oktaClient.createUser(oktaUser);
    // if (oktaResponse.errorCode) {
    //   console.log('test')
    //   const badResponse = await oktaResponse.json();
    //   throw new Error(badResponse.errorCauses[0].errorSummary);
    //   // return res.status(400).json(err.message);
    // }
    // const newUser = await oktaResponse.json();
    console.log(oktaResponse.id, 'test');
    const newUser = {
      userId: uuid(),
      oktaId: oktaResponse.id,
      firstName: oktaResponse.profile.firstName,
      lastName: oktaResponse.profile.lastName,
      email: oktaResponse.profile.email,
    };
    const dbUser = await UserService.createUser(newUser);
    return res.status(201).json(dbUser);
    // const response = await fetch(process.env.OKTA_ORG_URL || 'noOktaURL', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json',
    //     Authorization: `SSWS ${oktaToken}`,
    //   },
    //   body: JSON.stringify(oktaUser),
    // });
    // console.log(response);
    // const data = await response.json();

    // const user: BaseUser = req.body;
    // const newUser = await UserService.create(user);

    // res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.errorCauses[0].errorSummary);
  }
});

// PUT items/:id

// usersRouter.put("/:id", async (req: Request, res: Response) => {
//   const id: string = req.params.id;

//   try {
//     const userUpdate: User = req.body;

//     const existingUser: User | undefined = await UserService.find(id);

//     if (existingUser) {
//       const updatedItem = await UserService.update(id, userUpdate);
//       return res.status(200).json(updatedItem);
//     }

//     const newUser = await UserService.create(userUpdate);

//     res.status(201).json(newUser);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

// // DELETE items/:id

// usersRouter.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const id: string = req.params.id;
//     await UserService.remove(id);

//     res.sendStatus(204);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });
