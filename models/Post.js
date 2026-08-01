const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'posts.json');

function readAll() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw || '[]');
}

function writeAll(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

module.exports = {
  getAll() {
    return readAll().sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  getById(id) {
    return readAll().find((p) => p.id === id);
  },

  create({ title, author, content }) {
    const posts = readAll();
    const newPost = {
      id: uuidv4(),
      title,
      author: author || 'Anonymous',
      content,
      createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    writeAll(posts);
    return newPost;
  },

  update(id, { title, author, content }) {
    const posts = readAll();
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    posts[idx] = { ...posts[idx], title, author, content };
    writeAll(posts);
    return posts[idx];
  },

  remove(id) {
    const posts = readAll();
    const filtered = posts.filter((p) => p.id !== id);
    writeAll(filtered);
    return filtered.length !== posts.length;
  },
};
