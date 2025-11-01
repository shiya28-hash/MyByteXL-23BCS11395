require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// health check
app.get('/api/health', (req,res)=> res.json({ok:true}));

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/social_app';

mongoose.connect(MONGO)
.then(()=> {
  console.log('Connected to MongoDB');
  app.listen(PORT, ()=> console.log('Server running on port', PORT));
})
.catch(err=>{
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
