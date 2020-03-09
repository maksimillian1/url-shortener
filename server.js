const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ShortUrl = require('./src/ulr-schema');

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
});

const server = express();
server.set('view engine', 'ejs');
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true
}));
server.listen(process.env.PORT || 5000);

server.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find({});
  console.log(shortUrls);
  res.render('index', { shortUrls: shortUrls });
});

server.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({full: req.body.fullUrl});
  res.redirect('/');
});

server.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if(shortUrl == null) return res.sendStatus(404);
  
  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
  
});

