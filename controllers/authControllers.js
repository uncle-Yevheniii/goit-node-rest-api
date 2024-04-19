import { logInUserService } from "../services/authServices.js";
import { registerUserService } from "../services/authServices.js";

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
