import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/HttpError.js";
import { errorText } from "../constants/errorText.js";

const { e401 } = errorText;

export const singnTokenService = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const checkTokenService = (token) => {
  if (!token) throw HttpError(401, e401);

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    return id;
  } catch (e) {
    throw HttpError(401, e401);
  }
};
