import Joi from "joi";

import { joiValidator } from "../helpers/joiValidator.js";
import { PASSWD_REGEX } from "../constants/regex.js";
import { userSubscription } from "../constants/userSubscription.js";

export const registerUserValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      subscription: Joi.string().valid(...Object.values(userSubscription)),
    })
    .validate(data)
);

export const loginUserValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data)
);

export const verifyUserValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
    })
    .validate(data)
);
