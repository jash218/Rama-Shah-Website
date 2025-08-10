// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const username = 'admin';
    const plainPassword = 'secret123';

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({ username, password: hashedPassword });

    await user.save();
    console.log("✅ Admin user created:", username);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error connecting to DB:", err);
  });
