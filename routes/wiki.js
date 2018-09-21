'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const addPage = require('../views/addPage');

router.get('/', (req, res, next) => {
  res.send('get');
});

router.post('/', async(req, res, next) => {
  const title = req.body.title;
  //const slug = title.split(' ').join('-');
  const content = req.body.content;
  const page = new models.Page({
    title: title,
   // slug: slug,
    content: content
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
