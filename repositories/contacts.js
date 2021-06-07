const ContactSchema = require('../model/contact');

const listContacts = async (userId) => {
  const results = await ContactSchema.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email phone favorite -_id'
  });
  return results;
};

const getContactById = async (userId, contactId) => {
  const contactById = await ContactSchema.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'name email phone favorite'
  });
  return contactById;
};

const removeContact = async (userId, contactId) => {
  const result = await ContactSchema.findOneAndRemove({ _id: contactId, owner: userId })
  return result;
};

const addContact = async (userId, body) => {
  const result = await ContactSchema.create({ owner: userId, ...body });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const result = await ContactSchema.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const updateStatusContact = async (userId, contactId, body) => {
  const result = await ContactSchema.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { favorite: body.favorite },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};