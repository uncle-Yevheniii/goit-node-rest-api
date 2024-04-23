import Joi from "joi";

import { joiValidator } from "../helpers/joiValidator.js";
import { PHONE_REGEX } from "../constants/regex.js";

export const createContactValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().regex(PHONE_REGEX).required(),
      owner: Joi.string(),
      favorite: Joi.boolean(),
    })
    .validate(data)
);

export const updateContactValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email(),
      phone: Joi.string().regex(PHONE_REGEX),
      owner: Joi.string(),
    })
    .validate(data)
);
export const updateStatusValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({ favorite: Joi.boolean(), owner: Joi.string() })
    .validate(data)
);
