import { addContactServices } from "../services/contactsServices.js";
import { changeContactServices } from "../services/contactsServices.js";
import { listContactsServices } from "../services/contactsServices.js";
import { removeContactServices } from "../services/contactsServices.js";

export const createContact = async (req, res, next) => {
  try {
    const newUser = await addContactServices(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await listContactsServices();

    res.status(200).json(allContacts);
  } catch (e) {
    next(e);
  }
};

export const getOneContact = (req, res) => {
  const { user } = req;
  console.log(user);

  res.status(200).json(user);
};

export const deleteContact = async (req, res, next) => {
  try {
    const { user } = req;
    const deleteUser = await removeContactServices(user.id);

    res.status(200).json(deleteUser);
  } catch (e) {
    next(e);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { body, user } = req;
    const updatedStatus = await changeContactServices(user.id, body);

    res.status(200).json(updatedStatus);
  } catch (e) {
    next(e);
  }
};

// export const updateStatusContact = async (req, res, next) => {
//   try {
//     const { body, user } = req;
//     const updatedUser = await Contacts.findByIdAndUpdate(user.id, body, {
//       new: true,
//     });

//     res.status(200).json(updatedUser);
//   } catch (e) {
//     next(e);
//   }
// };
