import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import path from "path";

//path to the variable
const contactsPath = path.resolve("db", "contacts.json");

// ================================================================
export async function listContacts() {
  try {
    // ...твій код. Повертає масив контактів.

    const readResult = await fs.readFile(contactsPath);
    return JSON.parse(readResult);
  } catch (err) {
    console.log(err);
  }
}

// ================================================================
export async function getContactById(contactId) {
  try {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.

    const contactsJson = await listContacts();
    const contact = contactsJson.find((data) => data.id === contactId);
    return contact ? contact : null;
  } catch (err) {
    console.log(err);
  }
}

// ================================================================
export async function addContact(name, email, phone) {
  try {
    // ...твій код. Повертає об'єкт доданого контакту (з id).

    const contactsJson = await listContacts();
    const createContact = { id: nanoid(), name, email, phone };

    const newContactsObj = [...contactsJson, createContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsObj));

    return createContact;
  } catch (error) {
    console.log(error);
  }
}

// ================================================================
export async function removeContact(user) {
  try {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

    const deleteUser = user;
    const contactsJson = await listContacts();
    const visibleContacts = contactsJson.filter((data) => data.id !== user.id);

    await fs.writeFile(contactsPath, JSON.stringify(visibleContacts));
    return deleteUser;
  } catch (err) {
    console.log(err);
  }
}
