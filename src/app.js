const express = require('express');
const validator = require('validator');

function MemoryStorage() {
  this.data = [];
}

MemoryStorage.prototype.set = function create(original) {
  const id = this.data.length;
  this.data.push(original);
  return id;
};

MemoryStorage.prototype.get = function get(id) {
  return this.data[id];
};

const createShortenedUrl = (storage, originalUrl) => validator.isURL(originalUrl) ?
  storage.set(originalUrl) :
  null;

const getOriginalUrl = (storage, id) => storage.get(Number(id)) === undefined ?
  null :
  storage.get(id);

const app = express();

const storage = new MemoryStorage();

app.get('/:id', (req, res) => {
  const id = req.params.id;
  const target = getOriginalUrl(storage, id);
  return target === null ? res.json({ error: 'invalid id' }) : res.redirect(target);
});

app.get('/new/*', (req, res) => {
  const originalUrl = req.params[0];
  const id = createShortenedUrl(storage, originalUrl);
  const shortenedUrl = `${req.protocol}://${req.get('host')}/${id}`;
  return id === null ?
    res.json({ error: 'invalid url' }) :
    res.json({ originalUrl, shortenedUrl });
});

module.exports.app = app;
