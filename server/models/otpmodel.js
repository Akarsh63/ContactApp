const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, index: { expires: 120 } },
});

const otpmodel = mongoose.model('otps', otpSchema);
module.exports = otpmodel;
