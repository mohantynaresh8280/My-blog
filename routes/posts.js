const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// INDEX - GET /posts
router.get('/', (req, res) => {
  const posts = Post.getAll();
  res.render('index', { posts });
});

// NEW - GET /posts/new  (must come before /:id)
router.get('/new', (req, res) => {
  res.render('new');
});

// CREATE - POST /posts
router.post('/', (req, res) => {
  const { title, author, content } = req.body;
  if (!title || !content) {
    return res.status(400).render('new', {
      error: 'Title and content are required.',
      old: req.body,
    });
  }
  const post = Post.create({ title, author, content });
  res.redirect(`/posts/${post.id}`);
});

// SHOW - GET /posts/:id
router.get('/:id', (req, res) => {
  const post = Post.getById(req.params.id);
  if (!post) return res.status(404).render('404');
  res.render('show', { post });
});

// EDIT - GET /posts/:id/edit
router.get('/:id/edit', (req, res) => {
  const post = Post.getById(req.params.id);
  if (!post) return res.status(404).render('404');
  res.render('edit', { post });
});

// UPDATE - PUT /posts/:id
router.put('/:id', (req, res) => {
  const { title, author, content } = req.body;
  const updated = Post.update(req.params.id, { title, author, content });
  if (!updated) return res.status(404).render('404');
  res.redirect(`/posts/${updated.id}`);
});

// DELETE - DELETE /posts/:id
router.delete('/:id', (req, res) => {
  Post.remove(req.params.id);
  res.redirect('/posts');
});

module.exports = router;
