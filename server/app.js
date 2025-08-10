require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors()); // <-- Add this line
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Blog backend is running ✅'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
