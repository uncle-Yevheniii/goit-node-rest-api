import { addContactServices } from "../services/contactsServices.js";
import { changeContactServices } from "../services/contactsServices.js";
import { listContactsServices } from "../services/contactsServices.js";
import { removeContactServices } from "../services/contactsServices.js";

export const createContact = async (req, res, next) => {
  try {
    const newContact = await addContactServices(req.body, req.user);

    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await listContactsServices(req.user);

    res.status(200).json(allContacts);
  } catch (e) {
    next(e);
  }
};

export const getOneContact = (req, res) => {
  const { contact } = req;

  res.status(200).json(contact);
};

export const deleteContact = async (req, res, next) => {
  try {
    const deleteUser = await removeContactServices(req.contact, req.user);

    res.status(200).json(deleteUser);
  } catch (e) {
    next(e);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updatedStatus = await changeContactServices(
      req.contact,
      req.body,
      req.user
    );

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
