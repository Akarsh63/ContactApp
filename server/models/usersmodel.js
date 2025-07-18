const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'contactsmodel',
    },
  ],
});

const usersmodel = mongoose.model('usersmodel', userschema);

module.exports = usersmodel;
