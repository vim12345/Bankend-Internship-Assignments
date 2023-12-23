const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'username');
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;
    const blogPost = new BlogPost({ title, content, author: userId });
    await blogPost.save();
    res.status(201).json({ message: 'Blog post created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:postId', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;
    const postId = req.params.postId;
    const blogPost = await BlogPost.findOne({ _id: postId, author: userId });
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    blogPost.title = title;
    blogPost.content = content;
    await blogPost.save();
    res.status(200).json({ message: 'Blog post updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:postId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.postId;
    const blogPost = await BlogPost.findOne({ _id: postId, author: userId });
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    await blogPost.remove();
    res.status(200).json({ message: 'Blog post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
