/**
 * The index controller
 */ 

var Category = require('../models/category.js');

exports.index = function(req, res) {
    Category.find({}, function (err, categorys) {
        res.render('index', {
        	title: 'My Store',
            categorys: categorys
        });
    });
};