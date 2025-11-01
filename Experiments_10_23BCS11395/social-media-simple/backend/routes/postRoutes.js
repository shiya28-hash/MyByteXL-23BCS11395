const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// Create post
router.post('/', auth, async (req,res)=>{
  try{
    const { title, content } = req.body;
    if(!title || !content) return res.status(400).json({ error: 'title/content required' });
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ error: 'author not found' });
    const p = new Post({ title, content, authorId: user._id, authorName: user.username, avatar: user.avatar });
    await p.save();
    res.status(201).json(p);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// List posts (summary)
router.get('/', async (req,res)=>{
  try{
    const posts = await Post.find().sort({ createdAt: -1 }).limit(100);
    const summary = posts.map(p=>({ id: p._id, title: p.title, authorName: p.authorName, avatar: p.avatar, likes: p.likes.length, commentsCount: p.comments.length, createdAt: p.createdAt }));
    res.json(summary);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// Get single post
router.get('/:id', async (req,res)=>{
  try{
    const p = await Post.findById(req.params.id);
    if(!p) return res.status(404).json({ error: 'post not found' });
    res.json(p);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// Like/unlike
router.post('/:id/like', auth, async (req,res)=>{
  try{
    const p = await Post.findById(req.params.id);
    if(!p) return res.status(404).json({ error: 'post not found' });
    const uid = req.user.id;
    const idx = p.likes.indexOf(uid);
    if(idx === -1){ p.likes.push(uid); await p.save(); return res.json({ liked: true, likes: p.likes.length }); }
    p.likes.splice(idx,1);
    await p.save();
    res.json({ liked: false, likes: p.likes.length });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

// Add comment
router.post('/:id/comments', auth, async (req,res)=>{
  try{
    const p = await Post.findById(req.params.id);
    if(!p) return res.status(404).json({ error: 'post not found' });
    const { content } = req.body;
    if(!content) return res.status(400).json({ error: 'content required' });
    const user = await User.findById(req.user.id);
    const comment = { content, authorId: user._id, authorName: user.username };
    p.comments.push(comment);
    await p.save();
    res.status(201).json(comment);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
