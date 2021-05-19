const express = require('express')
const router = express.Router()
const contacts = require('../../model/index.js');


router.get('/', async (req, res, next) => {
  const list = await contacts.listContacts();
  res.json({ message: list })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  // console.log(contactId);
  const contact = await contacts.getContactById(contactId);
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
