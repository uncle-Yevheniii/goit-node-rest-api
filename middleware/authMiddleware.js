import multer from "multer";
import path from "path";

import { errorText } from "../constants/errorText.js";
import { HttpError } from "../helpers/HttpError.js";
import { registerContactValidator } from "../schemas/authSchemas.js";
import { loginContactValidator } from "../schemas/authSchemas.js";
import { checkRegisterExistsServices } from "../services/authServices.js";
import { getFindOneUserByIdService } from "../services/authServices.js";
import { checkTokenService } from "../services/jwtServices.js";
import { nanoid } from "nanoid";
import { initUploadImageServices } from "../services/imageServices.js";

const { e400, e401, e409 } = errorText;

export const checkRegisterData = async (req, res, next) => {
  try {
    const { value, errors } = registerContactValidator(req.body);
    if (errors) throw HttpError(400, e400, errors);

    const userExist = await checkRegisterExistsServices({ email: value.email });
    if (userExist) throw HttpError(409, e409, errors);

    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkLogInData = async (req, res, next) => {
  try {
    const { value, errors } = loginContactValidator(req.body);
    if (errors) throw HttpError(400, e400, errors);

    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};

export const protect = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];

    const userId = await checkTokenService(token);
    if (!userId) throw HttpError(401, e401);

    const currentUser = await getFindOneUserByIdService(userId);
    if (!currentUser) throw HttpError(401, e401);

    req.user = currentUser;
    req.userId = userId;

    next();
  } catch (e) {
    next(e);
  }
};

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cbk) => {
//     cbk(null, path.join("public", "avatars"));
//   },
//   filename: (req, file, cbk) => {
//     const extension = file.mimetype.split("/")[1];
//     const idd = nanoid();
//     // <userId>-<randomId>.<extension>
//     cbk(null, `${req.user.id}-${idd}.${extension}`);
//   },
// });

// const multerFilter = (req, file, cbk) => {
//   if (file.mimetype.startsWith("image/")) {
//     cbk(null, true);
//   } else {
//     cbk(HttpError(400, "Please, upload images only.."), false);
//   }
// };

// export const uploadAvatar = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: { fieldSize: 2 * 1024 * 1024 },
// }).single("avatars");

export const uploadAvatar = initUploadImageServices("avatars");
