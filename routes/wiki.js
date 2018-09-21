'use strict';

const express = require('express');
const router = express.Router();
//const models = require('../models');
const addPage = require('../views/addPage');

router.get('/', (req, res, next) => {
  res.send('get');
});

router.post('/', (req, res, next) => {
  res.send('post');
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
