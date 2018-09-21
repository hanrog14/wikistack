'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const main = require('../views/main');

router.get('/', async (req, res, next) => {
  const allPages = await models.Page.findAll();
  console.log(allPages);
  res.send(main(allPages));
});

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  //const slug = title.split(' ').join('-');
  const content = req.body.content;
  const page = new models.Page({
    title: title,
    // slug: slug,
    content: content,
  });
  console.log(page);

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const pageInstance = await models.Page.findOne({
      where: { slug: req.params.slug },
    });
    let page = wikiPage(pageInstance, 'author');
    res.send(page);
  } catch (error) {
    next(error);
  }
  //res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
