import { registerUserService } from "../services/authServices.js";
import { singnTokenService } from "../services/jwtServices.js";

export const registerController = async (req, res, next) => {
  try {
    const newUser = await registerUserService(req.body);
    const token = singnTokenService(newUser.id);

    res.status(201).json({ user: newUser, token });
  } catch (e) {
    next(e);
  }
};
