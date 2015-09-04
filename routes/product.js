var product = require('../controllers/product.js');
var express = require('express');
var app = module.exports = express();

app.get('/product', product.list);

app.get('/product/new', product.new);

app.post('/product', product.save);

app.get('/product/:id/edit', product.edit);

app.put('/product/:id', product.update);

app.del('/product/:id', product.del);

// app.get('/product/:categoryId', product.byCategory);

