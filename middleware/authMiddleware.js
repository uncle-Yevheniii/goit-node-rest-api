import { errorText } from "../constants/errorText.js";
import { HttpError } from "../helpers/HttpError.js";
import { createContactValidator } from "../schemas/authSchemas.js";
import { checkRegisterExistsServices } from "../services/authServices.js";
import { createPasswordHashService } from "../services/authServices.js";

const { e400, e409 } = errorText;

export const checkRegisterData = async (req, res, next) => {
  try {
    const { value, errors } = createContactValidator(req.body);

    if (errors) throw HttpError(400, e400, errors);

    const contactExist = await checkRegisterExistsServices({
      email: value.email,
    });
    if (contactExist) throw HttpError(409, e409);

    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};

export const hashingPassword = async (req, res, next) => {
  try {
    const { password, ...restUserData } = req.body;

    const passwordHash = await createPasswordHashService(password);

    req.body = { ...restUserData, password: passwordHash };

    next();
  } catch (e) {
    next(e);
  }
};
