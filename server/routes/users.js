const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersmodel = require('../models/usersmodel');
const otpmodel = require('../models/otpmodel');
// const otpGenerator=require('otp-generator');
// var nodemailer = require('nodemailer');
router.get('/test', (req, res) => res.send('book route testing!'));

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'iitjguesthouse@gmail.com',
//       pass: 'yfeaofygjkudhifc'
//     }
// });

router.post('/register', async (req, res) => {
  const { username, password, confirmpassword, email } = req.body;
  const user = await usersmodel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  const userbyname = await usersmodel.findOne({ username });
  if (userbyname) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  if (password != confirmpassword) {
    return res.status(400).json({ message: "Passwords doesn't match" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const newuser = new usersmodel({ username, email, password: hashedpassword });
  await newuser.save();
  return res.status(200).json({ message: 'User registered Successfully' });
  // const otp=otpGenerator.generate(4,{
  //     digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false
  // })
  // const hashedotp=await bcrypt.hash(otp,10);
  // const newotp =new otpmodel({email,'otp':hashedotp})
  // await newotp.save()

  // var mailOptions={
  //     to: email,
  //    subject: "Otp for registration is: ",
  //    html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
  //  };

  //  transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //         return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);
  //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  //     res.render('otp');
  // });
  // return res.status(200).json({"Info":{username,password,email}})
});
router.post('/verifyotp', async (req, res) => {
  const { username, password, email, otp } = req.body;
  const user = await otpmodel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'SORRY, OTP EXPIRED!' });
  }
  const isotpvalid = await bcrypt.compare(otp, user.otp);
  if (isotpvalid) {
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new usersmodel({
      username,
      email,
      password: hashedpassword,
    });
    await newuser.save();
    return res.status(200).json({ message: 'User registered Successfully' });
  } else {
    return res.status(400).json({ message: 'Wrong OTP' });
  }
});

router.post('/login', async (req, res) => {
  // console.log(1)
  const { username, password } = req.body;

  const user = await usersmodel.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'No Existing User Found!' });
  }
  const ispasswordvalid = await bcrypt.compare(password, user.password);
  if (!ispasswordvalid) {
    return res.status(400).json({ message: 'Password is incorrect' });
  }
  const token = jwt.sign({ id: user._id }, 'secret');
  res.status(200).json({ token, userId: user._id });
});

router.get('/home/:userId', async (req, res) => {
  // console.log(1)

  // console.log(req.params.userId)
  const user = await usersmodel.findById(req.params.userId);
  // console.log(user)
  if (!user) {
    return res.status(400).json({ message: 'No Existing Users Found!' });
  }
  console.log(user.username);
  res.status(200).json(user.username);
});

module.exports = router;
