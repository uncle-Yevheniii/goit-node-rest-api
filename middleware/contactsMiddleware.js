import { getContactById } from "../services/contactsServices.js";
import { HttpError } from "../helpers/HttpError.js";
import { createContactValidator } from "../schemas/contactsSchemas.js";
import { Contacts } from "../models/userModel.js";

export const checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getContactById(id);

    if (!user) {
      throw HttpError(404, "Not found");
    }

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
