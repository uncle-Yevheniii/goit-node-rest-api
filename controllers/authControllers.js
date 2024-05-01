import { logOutUserService } from "../services/authServices.js";
import { uppdateUserAvatarService } from "../services/authServices.js";
import { registerUserService } from "../services/authServices.js";
import { verifyService } from "../services/verifyUserService.js";

export const registerController = async (req, res, next) => {
  try {
    const newUser = await registerUserService(req.body);
    const { email, subscription, avatarURL } = newUser;

    // send verivfication mail

    res.status(201).json({ user: { email, subscription, avatarURL } });
  } catch (e) {
    next(e);
  }
};

export const verifyUserController = async (req, res, next) => {
  try {
    // send verivfication mail

    res.status(200).json({ message: "Verification email sent" });
  } catch (e) {
    next(e);
  }
};

export const verifyUserByEmailController = async (req, res, next) => {
  try {
    const user = await verifyService(req.params);

    res.status(200).json({ message: "Verification successful", user });
  } catch (e) {
    next(e);
  }
};

export const logInController = (req, res, next) => {
  try {
    const { token, email, subscription, avatarURL } = req.user;

    res.status(200).json({ token, user: { email, subscription, avatarURL } });
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
    const { email, subscription, avatarURL } = req.user;

    res.status(200).json({ user: { email, subscription, avatarURL } });
  } catch (e) {
    next(e);
  }
};

export const uppdateUserAvatarController = async (req, res, next) => {
  try {
    const uppdatedUser = await uppdateUserAvatarService(req.user, req.file);

    res
      .status(200)
      .json({ ResponseBody: { avatarURL: uppdatedUser.avatarURL } });
  } catch (e) {
    next(e);
  }
};
