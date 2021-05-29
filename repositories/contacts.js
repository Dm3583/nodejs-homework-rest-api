const ContactSchema = require('../model/contact');
  
  const listContacts = async () => {
    const results = await ContactSchema.find();
    return results;
  };
  
  const getContactById = async (contactId) => {
    const contactById = await ContactSchema.findOne({ _id: contactId });
    return contactById;
  };
  
  const removeContact = async (contactId) => {
    const  result  = await ContactSchema.findOneAndRemove({ _id: contactId })
    return result
  };
  
  const addContact = async (body) => {
    const result = await ContactSchema.create(body);
    return result;
  };
  
  const updateContact = async (contactId, body) => {
    const { value: result } = await ContactSchema.findOneAndUpdate(
      {_id: contactId},
      {...body},
      {new: true}
    )
    return result;
  };
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
  };