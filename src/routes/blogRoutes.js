const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get all blog posts
router.get('/', blogController.getAllBlogPosts);

// Protected routes requiring authentication middleware
router.use(authMiddleware);

// Routes for authenticated users to manage their blog posts
router.post('/', blogController.createBlogPost);
router.put('/:postId', blogController.updateBlogPost);
router.delete('/:postId', blogController.deleteBlogPost);

module.exports = router;
