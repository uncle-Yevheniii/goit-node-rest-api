import { Contacts } from "../models/contactsModel.js";

export const addContactServices = async (contactsData) => {
  const newUser = await Contacts.create(contactsData);

  return newUser;
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

export const getContactByIdServices = async (id) => {
  const contact = await Contacts.findById(id);

  return contact;
};
