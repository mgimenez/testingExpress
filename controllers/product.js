/**
 * The product controller
 */ 

var Product = require('../models/product.js');

exports.list = function(req, res) {
    Product.find({}, function (err, products) {
        res.render('product/index', {
            title: 'Product list',
            products: products
        });
    });
};

exports.new = function(req, res) {
    res.render('product/new.jade', {
        title: 'Add new product'
    });
};

exports.save = function(req, res) {
    var product = new Product(req.body.product);
    product.save(function(err){
        if(!err) {
            res.redirect('/product');
        } else {
            res.redirect('/product/new');
        }
    })
};

exports.edit = function(req, res) {
    Product.findById(req.params.id, function (err, product) {
        res.render('product/edit', {
            title: 'Edit product',
            product: product
        });
    });
};

exports.update = function(req, res) {
    Product.findById(req.params.id, function (err, product) {
        product.name = req.body.product.name;
        product.save(function(err){
            if(!err) {
                res.redirect('/product');
            } else {
                //error
                //res.redirect('/product/edit');
            }
        });
    });
};

exports.del = function(req, res) {
    Product.findById(req.params.id, function (err, product) {
        if(!product) return next(new NotFound('Document Not Found'));
        product.remove(function() {
            res.redirect('/product');
        });
    });
};