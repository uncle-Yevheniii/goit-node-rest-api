import { errorText } from "../constants/errorText.js";
import { HttpError } from "../helpers/HttpError.js";
import { Contacts } from "../models/contactsModel.js";

const { e404 } = errorText;

export const addContactServices = async ({ name, email, phone }, owner) => {
  const newContact = await Contacts.create({
    name,
    email,
    phone,
    owner: owner.id,
  });

  return newContact;
};

export const listContactsServices = async () => {
  const allContacts = await Contacts.find();

  return allContacts;
};

export const removeContactServices = async (id) => {
  const deleteUser = await Contacts.findByIdAndDelete(id);

  return deleteUser;
};

export const changeContactServices = async (id, contactsData) => {
  const uppdatedUser = await Contacts.findByIdAndUpdate(id, contactsData, {
    new: true,
  });

  return uppdatedUser;
};

export const getContactByIdServices = async (id, owner) => {
  const contact = await Contacts.findById(id);

  if (!contact || contact.owner.toString() !== owner.id)
    throw HttpError(404, e404);

  return contact;
};
