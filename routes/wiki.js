'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const main = require('../views/main');

router.get('/', async (req, res, next) => {
  const allPages = await models.Page.findAll();
  res.send(main(allPages));
});

router.post('/', async (req, res, next) => {
  const author = req.body.author;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;

  const [user, wasCreated] = await models.User.findOrCreate({
    where: {
      name: author,
      email: email
    }
  });

  const page = await models.Page.create(req.body);

  page.setAuthor(user);

  try {
    await page.save();
    // await user.save();
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
