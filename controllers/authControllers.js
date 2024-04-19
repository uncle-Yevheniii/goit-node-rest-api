import {
  logInUserService,
  logOutUserService,
} from "../services/authServices.js";
import { registerUserService } from "../services/authServices.js";
import { getContactByIdServices } from "../services/contactsServices.js";

export const registerController = async (req, res, next) => {
  try {
    const newUser = await registerUserService(req.body);

    res.status(201).json({ user: newUser });
  } catch (e) {
    next(e);
  }
};

export const logInController = async (req, res, next) => {
  try {
    const user = await logInUserService(req.body);

    res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

export const logOutController = async (req, res, next) => {
  try {
    const id = req.userId;
    await logOutUserService(id);

    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
