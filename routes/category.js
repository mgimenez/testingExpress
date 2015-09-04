var category = require('../controllers/category.js');
var express = require('express');
var app = module.exports = express();

app.get('/category', category.list);

app.get('/category/new', category.new);

app.post('/category', category.save);

app.get('/category/:id/edit', category.edit);

app.put('/category/:id', category.update);

app.del('/category/:id', category.del);