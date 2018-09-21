'use strict';

const express = require('express');
const morgan = require('morgan');
const wikiRouter = require('./routes/wiki.js');
const userRouter = require('./routes/user');
const layout = require('./views/layout');

const app = express();
const models = require('./models');
const PORT = 3000;

// db.authenticate().then(() => {
//   console.log('connected to the database');
// });

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
app.use('/user', userRouter);
app.use('/wiki', wikiRouter);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

async function connect() {
  await models.db.sync({ force: true });
  app.listen(PORT, () => {
    console.log('Listening');
  });
}
connect();

//if (!module.parent) app.listen(3000);
