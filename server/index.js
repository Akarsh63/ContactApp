const mongoose =require('mongoose')
const express = require('express');
const cors =require('cors')
const app = express();
const usersrouter=require('./routes/users.js')
const contactlistrouter=require('./routes/contactlist.js')

require('dotenv').config()

app.get('/', (req, res) => res.send('/users ---> for users data'));
app.use(express.json())
app.use(cors())
app.use('/users',usersrouter)
app.use('/home',contactlistrouter)

mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
const port =4082;

app.listen(port, () => console.log(`Server running on port ${port}`));