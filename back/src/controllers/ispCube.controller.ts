import { Request, Response } from "express";
import {
  factFetchLink,
  getUsersFromIspCubeService,
  loginIspCubeService,
} from "../service/ispCube.service";
import { catchedController } from "../utils/catchedControllers";
import { findByEmail } from "../service/user.service";
import { User } from "../entities/User";

export const loginIspCube = catchedController(
  async (req: Request, res: Response) => {
    const { username, passwordIspCube, clientId, apiKey, email } = req.body;
    const token = await loginIspCubeService({
      username,
      passwordIspCube,
      clientId,
      apiKey,
      email,
    });
    res.status(201).send({ token, login: true });
  }
);

export const getUsersFromIspCubeController = catchedController(
  async (req: Request, res: Response) => {
    try {
      const { token, email } = req.body;

      const user: User = await findByEmail(email);
      const usersIspCube = await getUsersFromIspCubeService(token, user);

      res.status(200).json(usersIspCube);
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchFactController = catchedController(
  async (req: Request, res: Response) => {
    try {
      const { tokenIspCube, id, email} = req.body;
      const user: User = await findByEmail(email);
      const factLink = await factFetchLink(tokenIspCube, user, id);

      res.status(200).json(factLink);
    } catch (error) {
      console.log(error);
    }
  }
);
