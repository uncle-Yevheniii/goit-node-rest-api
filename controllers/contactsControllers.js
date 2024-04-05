import Joi from "joi";

import { createContactSchema } from "../schemas/contactsSchemas.js";
import { HttpError } from "../utils/httpError.js";
import {
  addContact,
  listContacts,
  removeContact,
} from "../services/contactsServices.js";
import { joiValidator } from "../utils/joiValidator.js";

export const createContact = async (req, res, next) => {
  try {
    // console.log();

    // console.log(createContactSchema.validate(req.body));

    console.log(createContactSchema.validate(req.body));
    const a = createContactSchema.validate(req.body);
    const { value, errors } = a;
    if (errors) {
      return new HttpError(400, "Invalid user data", errors);
    }
    const { name, email, phone } = value;
    const newUser = await addContact(name, email, phone);

    res.status(201).json({
      status: "create",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await listContacts();

    res.status(200).json({
      status: "read",
      data: allContacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneContact = (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: "read",
    data: user,
  });
};

export const deleteContact = async (req, res, next) => {
  try {
    const { user } = req;
    const deleteUser = await removeContact(user);

    res.status(200).json({
      status: "deleted",
      data: deleteUser,
    });
  } catch (error) {
    next(error);
  }
};

// export const updateContact = (req, res) => {};
