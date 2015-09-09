/* GET home page. */
var index = require('../controllers/index.js');
var express = require('express');
var app = module.exports = express();

app.get('/', index.index);
