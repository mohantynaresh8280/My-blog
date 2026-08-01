const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.json()); // parse JSON bodies (for API use)
app.use(methodOverride('_method')); // support PUT/DELETE via forms
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.redirect('/posts'));
app.use('/posts', postsRouter);

// 404 handler
app.use((req, res) => res.status(404).render('404'));

app.listen(PORT, () => {
  console.log(`Blog running at http://localhost:${PORT}`);
});
