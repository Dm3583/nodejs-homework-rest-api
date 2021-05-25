const fs = require('fs').promises
const path = require('path');
const { v4: uuid } = require('uuid');

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, './contacts.json'), 'utf-8');
  return JSON.parse(data);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const data = await readData();
  const contactById = data.find(contact => contact.id.toString() === contactId.toString());
  return contactById;
};

const removeContact = async (contactId) => {
  const data = await readData();
  const index = data.findIndex(contact => contact.id.toString() === contactId.toString());
  if (index !== -1) {
    const deletedContact = data.splice(index, 1);
    await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data, null, 2));
    return deletedContact;
  }
  return null;
}

const addContact = async (body) => {
  const id = uuid();
  const record = {
    id,
    ...body
  };
  const data = await readData();
  data.push(record);
  await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data, null, 2));
  return record;
};

const updateContact = async (contactId, body) => {
  const data = await readData();
  const contactById = data.find(contact => contact.id.toString() === contactId.toString());

  if (contactById) {
    Object.assign(contactById, body);
    console.log(contactById);
    await fs.writeFile(path.join(__dirname, './contacts.json'), JSON.stringify(data, null, 2));
  }
  return contactById;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
