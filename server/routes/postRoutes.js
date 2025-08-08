const express = require('express');
const router  = express.Router();
const Post    = require('../models/Post');
const Comment = require('../models/Comment');

// GET all posts, newest first
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching posts' });
  }
});

// CREATE a new post
router.post('/', async (req, res) => {
  const { title, body, author } = req.body;
  try {
    const newPost = new Post({ title, body, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// DELETE a post and all its comments
router.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    // 1) remove all comments belonging to this post
    await Comment.deleteMany({ postId });

    // 2) remove the post itself
    const deleted = await Post.findByIdAndDelete(postId);
    if (!deleted) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post and its comments have been deleted.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error deleting post' });
  }
});

module.exports = router;
