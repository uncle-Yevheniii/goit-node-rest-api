import bcrypt from "bcrypt";

import { errorText } from "../constants/errorText.js";
import { userSubscription } from "../constants/userSubscription.js";
import { User } from "../models/usersModel.js";
import { HttpError } from "../helpers/HttpError.js";

const { e401, e500 } = errorText;

export async function checkRegisterExistsServices(filter) {
  try {
    const contactExist = await User.exists(filter);

    return contactExist;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e500 });
  }
}

export async function createPasswordHashService(userData) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData, salt);

    return passwordHash;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e500 });
  }
}

export async function registerUserService(userData) {
  try {
    const newUser = await User.create({
      ...userData,
      subscription: userSubscription.STARTER,
    });
    newUser.password = undefined;

    return newUser;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e500 });
  }
}

export async function logInUserService(userData) {
  try {
    const { password, email } = userData;

    const user = await User.findOne({ email });
    if (!user) throw new HttpError(401, e401);

    const passIsValid = await bcrypt.compare(password, user.password);
    if (!passIsValid) throw new HttpError(401, e401);

    user.password = undefined;

    console.log(user);
    return user;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e500 });
  }
}
