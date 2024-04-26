import { errorText } from "../constants/errorText.js";
import { userSubscription } from "../constants/userSubscription.js";
import { User } from "../models/usersModel.js";
import { HttpError } from "../helpers/HttpError.js";
import { singnTokenService } from "./jwtServices.js";
import { checkPasswordHashService } from "./passwordHashService.js";
import { createPasswordHashService } from "./passwordHashService.js";
import { createUserGravartarServises } from "./gravatarServises.js";
import { saveImageServices } from "./imageServices.js";

const { e401, e400 } = errorText;

export const checkRegisterExistsServices = async (filter) => {
  const contactExist = await User.exists(filter);
  return contactExist;
};

export const registerUserService = async (userData) => {
  const passwordHash = await createPasswordHashService(userData.password);
  const userGravatar = createUserGravartarServises(userData.email);

  const newUser = await User.create({
    ...userData,
    password: passwordHash,
    subscription: userSubscription.STARTER,
    avatarURL: userGravatar,
  });

  newUser.password = undefined;

  // const token = singnTokenService(newUser.id);
  // newUser.token = token;

  return newUser;
};

export const logInUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, e401);

  const passIsValid = await checkPasswordHashService(password, user.password);
  if (!passIsValid) throw HttpError(401, e401);

  const token = singnTokenService(user.id);
  user.token = token;
  await user.save();

  user.password = undefined;

  return user;
};

export const getFindOneUserByIdService = async (id) => {
  const contact = await User.findById(id);

  return contact;
};

export const logOutUserService = async (id) => {
  const user = await User.findById(id);
  if (!user) throw HttpError(401, e401);

  user.token = null;
  await user.save();

  return user;
};

export const uppdateAvatarService = async (user, file) => {
  if (!file) HttpError(400, e400);
  // const userPath = file.path.replace("public", "");

  const saveImage = await saveImageServices(
    file,
    {
      maxFileSize: 2,
      width: 400,
      height: 400,
    },
    "avatars",
    user.id
  );

  const userAvatar = await User.findByIdAndUpdate(
    user.id,
    { avatarURL: saveImage },
    { new: true }
  );

  return userAvatar;
};
