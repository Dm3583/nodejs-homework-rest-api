const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index.js');


router.get('/', async (req, res, next) => {
  try {
    const contactsList = await Contacts.listContacts();
    res.json({ status: 'success', code: 200, data: { contactsList } })
  } catch (e) {
    next();
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  // console.log(contactId);
  const contact = await Contacts.getContactById(contactId);
  res.json({ message: contact })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
