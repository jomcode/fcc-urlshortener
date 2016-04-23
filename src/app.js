const express = require('express');

const storage = {};

const createShortenedUrl = () => {};

const getOriginalUrl = () => {};

const app = express();

app.get('/:id', (req, res) => {
  console.log(`/${req.params.id}`);
  res.json({ foo: 'foo' });
});

app.get('/new/:originalUrl', (req, res) => {
  const originalUrl = req.params.originalUrl;
  console.log(`/new/${originalUrl}`);
  res.json({ bar: 'bar' });
});

module.exports.app = app;
