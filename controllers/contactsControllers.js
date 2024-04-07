import { HttpError } from "../helpers/HttpError.js";
import {
  createContactValidator,
  updateContactValidator,
} from "../schemas/contactsSchemas.js";
import {
  addContact,
  changeContact,
  listContacts,
  removeContact,
} from "../services/contactsServices.js";

export const createContact = async (req, res, next) => {
  try {
    const { value, errors } = createContactValidator(req.body);
    const { name, email, phone } = value;

    if (errors) {
      throw HttpError(400, "Invalid user data", errors);
    }

    const newUser = await addContact(name, email, phone);
    res.status(201).json({
      ...newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await listContacts();

    res.status(200).json({
      ...allContacts,
    });
  } catch (e) {
    next(e);
  }
};

export const getOneContact = (req, res) => {
  const { user } = req;

  res.status(200).json({
    ...user,
  });
};

export const deleteContact = async (req, res, next) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const deleteUser = await removeContact(id);

    res.status(200).json({
      ...deleteUser,
    });
  } catch (e) {
    next(e);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value, errors } = updateContactValidator(req.body);

    if (errors) {
      throw HttpError(400, "Invalid user data", errors);
    }

    if (Object.keys(value).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const updatedUser = await changeContact(id, value);
    res.status(200).json({
      ...updatedUser,
    });
  } catch (e) {
    next(e);
  }
};
