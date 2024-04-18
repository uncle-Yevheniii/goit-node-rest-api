import { logInUserService } from "../services/authServices.js";
import { registerUserService } from "../services/authServices.js";
import { singnTokenService } from "../services/jwtServices.js";

export const registerController = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);

    const token = singnTokenService(user.id);
    user.token = token;

    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

export const logInController = async (req, res, next) => {
  try {
    const user = await logInUserService(req.body);

    const token = singnTokenService(user.id);
    user.token = token;

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
