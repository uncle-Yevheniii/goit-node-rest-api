import { HttpError } from "../helpers/HttpError.js";
import {
  createContactValidator,
  updateContactValidator,
} from "../schemas/contactsSchemas.js";
// import {
//   addContact,
//   changeContact,
//   listContacts,
//   removeContact,
// } from "../services/contactsServices.js";
import { Contacts } from "../models/userModel.js";

export const createContact = async (req, res, next) => {
  try {
    // const newUser = await addContact(req.body);
    const newUser = await Contacts.create(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    // const allContacts = await listContacts();
    const allContacts = await Contacts.find();

    res.status(200).json(allContacts);
  } catch (e) {
    next(e);
  }
};

export const getOneContact = (req, res) => {
  const { user } = req;

  res.status(200).json(user);
};

export const deleteContact = async (req, res, next) => {
  try {
    const { user } = req;
    // const deleteUser = await removeContact(id);
    console.log(user);

    const deleteUser = await Contacts.findByIdAndDelete(user.id);

    res.status(200).json(deleteUser);
  } catch (e) {
    next(e);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { body, user } = req;
    // const { value, errors } = updateContactValidator(req.body);

    // if (errors) throw HttpError(400, "Invalid user data", errors);

    // if (Object.keys(value).length === 0)
    //   throw HttpError(400, "Body must have at least one field");

    const updatedUser = await Contacts.findByIdAndUpdate(user.id, body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    next(e);
  }
};
