import { Types } from "mongoose";

import { HttpError } from "../helpers/HttpError.js";
import {
  createContactValidator,
  updateContactValidator,
  updateStatusValidator,
} from "../schemas/contactsSchemas.js";
import {
  getContactByIdServices,
  checkContactsExistsServices,
} from "../services/contactsServices.js";

export const checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isIdValid = Types.ObjectId.isValid(id);
    if (!isIdValid) throw HttpError(404, "Not found");

    const contact = await getContactByIdServices(id);

    if (!user) throw HttpError(404, "Not found");

    req.user = contact;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkCreateContacts = async (req, res, next) => {
  try {
    const { value, errors } = createContactValidator(req.body);

    if (errors) throw HttpError(400, "Invalid user data", errors);

    const contactExist = await checkContactsExistsServices({
      email: value.email,
    });
    if (contactExist)
      throw HttpError(409, "Uset with that eamail alredy exist...");

    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkUppdateContacs = async (req, res, next) => {
  try {
    const { value, errors } = updateContactValidator(req.body);

    if (errors) throw HttpError(400, "Invalid user data", errors);
    if (Object.keys(value).length === 0)
      throw HttpError(400, "Body must have at least one field");

    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkUppdateStatusContacs = async (req, res, next) => {
  try {
    const { value, errors } = updateStatusValidator(req.body);
    if (errors) throw HttpError(400, "Invalid user data", errors);

    req.body = value;
    next();
  } catch (e) {
    next(e);
  }
};
