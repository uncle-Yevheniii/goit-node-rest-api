import { Contacts } from "../models/userModel.js";
import { errorText } from "../constants/errorText.js";

const { e500 } = errorText;

export async function addContactServices(contactsData) {
  try {
    const newUser = await Contacts.create(contactsData);

    return newUser;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e500 });
  }
}

export async function listContactsServices() {
  try {
    const allContacts = await Contacts.find();

    return allContacts;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export async function removeContactServices(id) {
  try {
    const deleteUser = await Contacts.findByIdAndDelete(id);

    return deleteUser;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e500 });
  }
}

export async function changeContactServices(id, contactsData) {
  try {
    const uppdatedUser = await Contacts.findByIdAndUpdate(id, contactsData, {
      new: true,
    });

    return uppdatedUser;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e500 });
  }
}

export async function getContactByIdServices(id) {
  try {
    const contact = await Contacts.findById(id);

    return contact;
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e500 });
  }
}

// export async function checkContactsExistsServices(filter) {
//   try {
//     const contactExist = await Contacts.exists(filter);

//     return contactExist;
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({ message: e500 });
//   }
// }
