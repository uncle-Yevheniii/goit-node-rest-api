import { errorText } from "../constants/errorText.js";
import { HttpError } from "../helpers/HttpError.js";
import { registerContactValidator } from "../schemas/authSchemas.js";
import { loginContactValidator } from "../schemas/authSchemas.js";
import { checkRegisterExistsServices } from "../services/authServices.js";

const { e400, e409 } = errorText;

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
