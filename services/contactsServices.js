import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    return JSON.parse(readResult);
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export async function getContactById(contactId) {
  try {
    const contactsJson = await listContacts();
    const contact = contactsJson.find((data) => data.id === contactId);
    return contact ? contact : null;
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function addContact(name, email, phone) {
  try {
    const contactsJson = await listContacts();
    const createContact = { id: nanoid(), name, email, phone };

    const newContactsObj = [...contactsJson, createContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsObj));

    return createContact;
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function removeContact(contactId) {
  try {
    const deleteUser = await getContactById(contactId);
    const contactsJson = await listContacts();
    const visibleContacts = contactsJson.filter(
      (data) => data.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(visibleContacts));
    return deleteUser;
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function changeContact(id, value) {
  try {
    const prevContact = await getContactById(id);
    const changedContact = { ...prevContact, ...value };
    const userList = await listContacts();
    const index = userList.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      userList[index] = changedContact;
    }

    await fs.writeFile(contactsPath, JSON.stringify(userList));

    return changedContact;
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
