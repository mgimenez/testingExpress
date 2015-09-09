/**
 * The category controller
 */ 

var Category = require('../models/category.js');

exports.list = function(req, res) {
    Category.find({}, function (err, categorys) {
        res.render('category/index', {
            title: 'Categorias',
            categorys: categorys
        });
    });
};

exports.new = function(req, res) {
    res.render('category/new.jade', {
        title: 'Agregar nueva categoria'
    });
};

exports.save = function(req, res) {
    var category = new Category(req.body.category);
    category.save(function(err){
        if(!err) {
            res.redirect('/category');
        } else {
            res.redirect('/category/new');
        }
    })
};

exports.edit = function(req, res) {
    Category.findById(req.params.id, function (err, category) {
        res.render('category/edit', {
            title: 'Editar categoria',
            category: category
        });
    });
};

exports.update = function(req, res) {
    Category.findById(req.params.id, function (err, category) {
        category.name = req.body.category.name;
        category.save(function(err){
            if(!err) {
                res.redirect('/category');
            } else {
                //error
                //res.redirect('/category/edit');
            }
        });
    });
};

exports.del = function(req, res) {
    Category.findById(req.params.id, function (err, category) {
        if(!category) return next(new NotFound('Document Not Found'));
        category.remove(function() {
            res.redirect('/category');
        });
    });
};