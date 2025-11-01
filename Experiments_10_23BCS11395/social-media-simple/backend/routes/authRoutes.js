const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../utils/helpers');

router.post('/register', async (req,res)=>{
  try{
    const { username, password, bio, avatar } = req.body;
    if(!username || !password) return res.status(400).json({ error: 'username/password required' });
    const existing = await User.findOne({ username });
    if(existing) return res.status(409).json({ error: 'username taken' });
    const passwordHash = await hashPassword(password);
    const user = new User({ username, passwordHash, bio: bio||'', avatar: avatar||'' });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token, id: user._id, username: user.username, bio: user.bio, avatar: user.avatar });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/login', async (req,res)=>{
  try{
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({ error: 'username/password required' });
    const user = await User.findOne({ username });
    if(!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await comparePassword(password, user.passwordHash);
    if(!ok) return res.status(401).json({ error: 'invalid credentials' });
    const token = generateToken(user);
    res.json({ token, id: user._id, username: user.username, bio: user.bio, avatar: user.avatar });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
