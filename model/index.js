const db = require('./db.js');
const { ObjectId } = require('mongodb');

const id = (id) => {
  return new ObjectId(id)
};


const readData = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await readData(db, 'contacts');
  const results = await collection.find({}).toArray();
  console.log(results);
  return results;
};

const getContactById = async (contactId) => {
  const collection = await readData(db, 'contacts');
  const [contactById] = await collection.find({ _id: id(contactId) }).toArray();
  return contactById;
};

const removeContact = async (contactId) => {
  const collection = await readData(db, 'contacts');
  const { value: result } = await collection.findOneAndDelete({ _id: id(contactId) })
  return result
}

const addContact = async (body) => {
  const collection = await readData(db, 'contacts');
  const record = {
    ...body,
    ...(body.favorite ? {} : { favorite: false })
  };
  const {
    ops: [result]
  } = await collection.insertOne(record);

  return result;
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
