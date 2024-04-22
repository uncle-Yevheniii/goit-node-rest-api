import { errorText } from "../constants/errorText.js";
import { HttpError } from "../helpers/HttpError.js";
import { Contacts } from "../models/contactsModel.js";

const { e404 } = errorText;

export const addContactServices = async ({ name, email, phone }, owner) => {
  const newContact = await Contacts.create({
    name,
    email,
    phone,
    owner,
  });

  return newContact;
};

export const listContactsServices = async (owner) => {
  const allContacts = await Contacts.find({ owner });

  return allContacts;
};

export const removeContactServices = async ({ id }, owner) => {
  const deleteUser = await Contacts.findByIdAndDelete(id);

  if (!deleteUser || deleteUser.owner.toString() !== owner.id)
    throw HttpError(404, e404);

  return deleteUser;
};

export const changeContactServices = async ({ id }, contactsData, owner) => {
  const uppdatedUser = await Contacts.findByIdAndUpdate(id, contactsData, {
    new: true,
  });

  if (!uppdatedUser || uppdatedUser.owner.toString() !== owner.id)
    throw HttpError(404, e404);

  return uppdatedUser;
};

export const getContactByIdServices = async (id, owner) => {
  const contact = await Contacts.findById(id);

  if (!contact || contact.owner.toString() !== owner.id)
    throw HttpError(404, e404);

  return contact;
};
