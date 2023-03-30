const nanoid = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const getContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const listContacts = async () => {
  const contacts = await getContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  return contacts[index];
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  const deletedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await getContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
