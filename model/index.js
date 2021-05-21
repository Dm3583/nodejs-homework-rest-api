const fs = require('fs').promises
const contacts = require('./contacts.json');


const readData = async () => {
  const data = await fs.readFile('./contacts.json', 'utf-8');
  return JSON.parse(data);
};

const listContacts = async () => {
  return await readData();

}

const getContactById = async (contactId) => {
  const contactById = await readData().find(contact => contact.id.toString() === contactId.toString());
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
};
