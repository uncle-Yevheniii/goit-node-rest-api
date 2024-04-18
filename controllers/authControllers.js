import { logInUserService } from "../services/authServices.js";
import { registerUserService } from "../services/authServices.js";
import { singnTokenService } from "../services/jwtServices.js";

export const registerController = async (req, res, next) => {
  try {
    const newUser = await registerUserService(req.body);
    const token = await singnTokenService(newUser.id);

    res.status(201).json({ user: newUser, token });
  } catch (e) {
    next(e);
  }
};

export const logInController = async (req, res, next) => {
  try {
    const user = await logInUserService(req.body);
    const token = await singnTokenService(user.id);

    res.status(200).json({ user, token });
  } catch (e) {
    next(e);
  }
};
