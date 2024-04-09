import { Types } from "mongoose";

import { HttpError } from "../helpers/HttpError.js";
import { Contacts } from "../models/userModel.js";
import {
  createContactValidator,
  updateContactValidator,
} from "../schemas/contactsSchemas.js";
export const checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isIdValid = Types.ObjectId.isValid(id);
    if (!isIdValid) throw HttpError(404, "Not found");

    const user = await Contacts.findById(id);

    if (!user) throw HttpError(404, "Not found");

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export const checkCreateContacts = async (req, res, next) => {
  try {
    const { value, errors } = createContactValidator(req.body);

    if (errors) throw HttpError(400, "Invalid user data", errors);

    const contactExist = await Contacts.exists({ email: value.email });
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
export const checkDeleteContacts = async (req, res, next) => {
  try {
    next();
  } catch (e) {
    next(e);
  }
};
