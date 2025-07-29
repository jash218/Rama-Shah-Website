const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

router.post('/', async (req, res) => {
  const { postId, parentId, name, email, text, isAuthor } = req.body;
  try {
    const newComment = new Comment({ postId, parentId, name, email, text, isAuthor });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: 'Error posting comment' });
  }
});

module.exports = router;
