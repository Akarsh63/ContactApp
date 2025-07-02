const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
const contactmodel = require('../models/contactmodel');
const usersmodel = require('../models/usersmodel');

router.post('/contacts/:userId', async (req, res) => {
  const user = await usersmodel.findById(req.params.userId);
  const ct = await contactmodel.find({
    contactname: req.body.name,
    contactnumber: req.body.number,
    contactemail: req.body.email,
  });
  const filteredContacts = await Promise.all(
    ct.map(async (element) => {
      if (element.userId.toString() === req.params.userId) {
        console.log(element);
        return element;
      }
      return null;
    }),
  );
  if (filteredContacts.filter(Boolean).length !== 0) {
    console.log('Contact already saved!');
    return res.status(400).json('Contact already saved!');
  }
  const contact = new contactmodel({
    // _id: new mongoose.Types.ObjectId(),
    contactname: req.body.name,
    contactnumber: req.body.number,
    contactemail: req.body.email,
    userId: req.body.userid,
  });
  const result = await contact.save();
  const contactcreatedtopush = {
    contactname: result.contactname,
    contactnumber: result.contactnumber,
    contactemail: result.email,
    _id: result._id,
  };
  try {
    user.Contacts.push(contactcreatedtopush);
    await user.save();
    res.status(201).json({ savedcontacts: user.Contacts });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/contacts/:userId', async (req, res) => {
  try {
    const user = await usersmodel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const savedcontacts = await contactmodel.find({
      _id: { $in: user.Contacts },
    });
    // console.log(savedcontacts)
    if (savedcontacts.length === 0) {
      return res.status(200).json({ message: 'No contacts saved yet' });
    }

    res.status(200).json({ savedcontacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/delete', async (req, res) => {
  try {
    const { key, userId } = req.body;
    // const user = await usersmodel.findByIdAndUpdate(userId, {
    //     $pull: { Contacts: { _id: key } }
    //   });

    const user = await usersmodel.findById(userId);
    const contacts = user.Contacts;
    // Find the index of the contact to be deleted in the Contacts array
    const contactIndex = contacts.findIndex(
      (contact) => contact.toString() === key,
    );
    if (contactIndex !== -1) {
      // If the contact exists in the Contacts array, remove it
      contacts.splice(contactIndex, 1);
      await contactmodel.findByIdAndDelete(key);
      // Save the updated user document
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
router.put('/update/:key', async (req, res) => {
  try {
    const { details } = req.body;
    await contactmodel.findByIdAndUpdate(req.params.key, { $set: details });
    res.status(200).json('Updated Successfully');
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
