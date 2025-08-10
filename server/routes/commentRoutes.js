const express = require('express');
const router  = express.Router();
const Comment = require('../models/Comment');

// GET all comments for a given post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

// CREATE a new comment (or reply)
router.post('/', async (req, res) => {
  const { postId, parentId, name, email, text, isAuthor } = req.body;
  try {
    const newComment = new Comment({ postId, parentId, name, email, text, isAuthor });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error posting comment' });
  }
});

// DELETE a single comment
router.delete('/:commentId', async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.commentId);
    if (!deleted) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting comment' });
  }
});

module.exports = router;
