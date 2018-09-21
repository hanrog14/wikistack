'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false}));
//app.use(express.json());

app.get('/', (req,res) => {
    res.send('hello');
});

app.listen(3000);