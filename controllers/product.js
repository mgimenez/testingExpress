/**
 * The product controller
 */ 

var Product = require('../models/product.js');
var Category = require('../models/category.js');

exports.list = function(req, res) {
    Product.find({}, function (err, products) {
        Category.find({}, function (err, categories) {
            res.render('product/index', {
                title: 'Product list',
                products: products,
                categories: categories

            });
        });
    });
};

exports.productByCategory = function(req, res) {
    var query = Product.where('categoryId', req.params.categoryId);
    Product.find(query, function (err, products) {
        Category.find({}, function (err, categories) {
            res.render('product/index', {
                title: 'Product list',
                products: products,
                categories: categories

            });
        });
    });
};

exports.product = function(req, res) {
    Product.findById(req.params.id, function (err, product) {
        Category.find({}, function(err, categories){
            res.render('product/product', {
                title: 'Product Description',
                product: product,
                categories: categories
            });
        });
    });
};

exports.new = function(req, res) {
    Category.find({}, function (err, categories) {
        res.render('product/new.jade', {
            title: 'Add new product',
            categories: categories
        });
    })
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
        Category.find({}, function(err, categories){
            res.render('product/edit', {
                title: 'Edit product',
                product: product,
                categories: categories
            });
        });
    });
};

exports.update = function(req, res) {
    Product.findById(req.params.id, function (err, product) {
        product.name = req.body.product.name;
        product.description = req.body.product.description;
        product.price = req.body.product.price;
        product.categoryId = req.body.product.categoryId;
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