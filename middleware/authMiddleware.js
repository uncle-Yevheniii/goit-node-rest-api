import { errorText } from "../constants/errorText.js";
import { HttpError } from "../helpers/HttpError.js";
import { registerContactValidator } from "../schemas/authSchemas.js";
import { loginContactValidator } from "../schemas/authSchemas.js";
import { checkRegisterExistsServices } from "../services/authServices.js";
import { getFindOneUserByIdService } from "../services/authServices.js";
import { checkTokenService } from "../services/jwtServices.js";
import { logInUserService } from "../services/authServices.js";

const { e400, e401, e404, e409 } = errorText;

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

    const user = await logInUserService(value);

    if (user.verify === false) throw HttpError(404, e404);

    req.user = user;
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
