import { Types } from "mongoose";

import { HttpError } from "../helpers/HttpError.js";
import { createContactValidator } from "../schemas/contactsSchemas.js";
import { updateContactValidator } from "../schemas/contactsSchemas.js";
import { updateStatusValidator } from "../schemas/contactsSchemas.js";
import { getContactByIdServices } from "../services/contactsServices.js";
import { errorText } from "../constants/errorText.js";

const { e400, e404 } = errorText;

export const checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isIdValid = Types.ObjectId.isValid(id);
    if (!isIdValid) throw HttpError(404, e404);

    const contact = await getContactByIdServices(id, req.user);
    if (!contact) throw HttpError(404, e404);

    req.contact = contact;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkCreateContacts = async (req, res, next) => {
  try {
    const { value, errors } = createContactValidator(req.body);

    if (errors) throw HttpError(400, e400, errors);

    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkUppdateContacs = async (req, res, next) => {
  try {
    const { value, errors } = updateContactValidator(req.body);

    if (errors) throw HttpError(400, e400, errors);
    if (Object.keys(value).length === 0) throw HttpError(400, e400);

    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkUppdateStatusContacs = async (req, res, next) => {
  try {
    const { value, errors } = updateStatusValidator(req.body);
    if (errors) throw HttpError(400, e400, errors);

    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};
