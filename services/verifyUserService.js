import { errorText } from "../constants/errorText.js";
import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";

const { e404 } = errorText;

export const verifyService = async ({ verificationToken }) => {
  const user = await User.findOne({ verificationToken });
  if (!user) throw HttpError(404, e404);

  const verifyUser = await User.findByIdAndUpdate(
    user.id,
    {
      verify: true,
      verificationToken: null,
    },
    { new: true }
  );

  return verifyUser;
};
