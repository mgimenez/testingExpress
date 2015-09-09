var product = require('../controllers/product.js');
var express = require('express');
var app = module.exports = express();

/* Product List  */
app.get('/product', product.list);

/* Product List by Category */
app.get('/product/category/:categoryId', product.productByCategory);

/* Add New Product View  */
app.get('/product/new', product.new);

/* Add new Product Post  */
app.post('/product', product.save);

/* Edit Product View  */
app.get('/product/:id/edit', product.edit);

/* Edit Product Post */
app.put('/product/:id', product.update);

/* Delete Product */
app.del('/product/:id', product.del);

/* Product description View */
app.get('/product/:id', product.product);