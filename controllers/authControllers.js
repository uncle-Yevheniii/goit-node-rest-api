import { logOutUserService } from "../services/authServices.js";
import { logInUserService } from "../services/authServices.js";
import { registerUserService } from "../services/authServices.js";

export const registerController = async (req, res, next) => {
  try {
    const newUser = await registerUserService(req.body);
    const { email, subscription } = newUser;

    res.status(201).json({ user: { email, subscription } });
  } catch (e) {
    next(e);
  }
};

export const logInController = async (req, res, next) => {
  try {
    const user = await logInUserService(req.body);
    const { token, email, subscription } = user;

    res.status(200).json({ token, user: { email, subscription } });
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

export const currentUserController = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({ user: { email, subscription } });
  } catch (e) {
    next(e);
  }
};
