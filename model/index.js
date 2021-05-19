const fs = require('fs').promises
const contacts = require('./contacts.json')

const listContacts = async () => {
  console.log(contacts);
  return contacts;

}

const getContactById = async (contactId) => {
  const contactById = await contacts.find(contact => contact.id.toString() === contactId.toString());
  return contactById;
}

const removeContact = async (contactId) => { }

const addContact = async (body) => { }

const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
