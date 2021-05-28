const express = require('express');
const router = express.Router();
const Contacts = require('../../model/index.js');
const { validateCreateContact, validateUpdateContact } = require('../../validation/contactsValidation.js');

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await Contacts.listContacts();
    return res.json({ status: 'success', code: 200, data: { contactsList } })
  } catch (e) {
    next(e);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    };
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  };
});

router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    next(e);
  };
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    };
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  };
});

router.patch('/:contactId', validateUpdateContact, async (req, res, next) => {
  console.log(req.params.contactId);
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    };
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  };
});

module.exports = router
