const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  contactname: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: Number,
    required: true,
  },
  contactemail: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'usersmodel',
  },
});

const contactsmodel = mongoose.model('contacts', contactSchema);

module.exports = contactsmodel;
