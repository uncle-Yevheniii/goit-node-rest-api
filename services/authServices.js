import { errorText } from "../constants/errorText.js";
import { userSubscription } from "../constants/userSubscription.js";
import { User } from "../models/usersModel.js";
import { HttpError } from "../helpers/HttpError.js";
import { singnTokenService } from "./jwtServices.js";
import { checkPasswordHashService } from "./passwordHashService.js";
import { createPasswordHashService } from "./passwordHashService.js";

const { e401 } = errorText;

export const checkRegisterExistsServices = async (filter) => {
  const contactExist = await User.exists(filter);
  return contactExist;
};

export const registerUserService = async (userData) => {
  const passwordHash = await createPasswordHashService(userData.password);

  const newUser = await User.create({
    ...userData,
    password: passwordHash,
    subscription: userSubscription.STARTER,
  });

  newUser.password = undefined;

  const token = singnTokenService(newUser.id);
  newUser.token = token;

  return newUser;
};

export const logInUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, e401);

  const passIsValid = await checkPasswordHashService(password, user.password);
  if (!passIsValid) throw HttpError(401, e401);

  user.password = undefined;

  const token = singnTokenService(user.id);
  user.token = token;

  return user;
};
