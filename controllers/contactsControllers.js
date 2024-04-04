// import contactsService from "../services/contactsServices.js";

import {
  addContact,
  listContacts,
  removeContact,
} from "../services/contactsServices.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    // validation

    const newUser = await addContact(name, email, phone);

    res.status(201).json({
      status: "create",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const allContacts = await listContacts();

    res.status(200).json({
      status: "read",
      data: allContacts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneContact = (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: "read",
    data: user,
  });
};

export const deleteContact = async (req, res) => {
  try {
    const { user } = req;
    const deleteUser = await removeContact(user);

    res.status(200).json({
      status: "deleted",
      data: deleteUser,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const updateContact = (req, res) => {};
