/**
 * The admin controller
 */ 

// var User = require('../../models/user.js');


/**
 * Show the login form, 
 * later this method also can show (only if the user have session) 
 * links to CRUD app
 */
exports.index = function(req, res) {
    res.render('admin/index', {
    	title: 'Admin'
    });
}