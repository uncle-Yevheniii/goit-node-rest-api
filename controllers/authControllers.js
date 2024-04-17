import { registerUserService } from "../services/authServices.js";

export const registerController = async (req, res, next) => {
  try {
    const newUser = await registerUserService(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
};
