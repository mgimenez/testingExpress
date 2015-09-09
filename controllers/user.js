/**
 * The user controller
 */ 

var User = require('../models/user.js');
var pwd = require('../pwd.js');

exports.login = function(req, res) {
    res.render('admin/index', {
    	title: 'Login'
    });
};

//app.post('/login', function(req, res) {
exports.auth = function(req, res) {
	authenticate(req.body.user.username, req.body.user.password, function(err, user){
		if (user) {
			req.session.regenerate(function(){
				console.log('User: ' + user.username + ' loged');
				req.session.user = user;
				res.redirect('/');
			});
		} else {
			console.log(err);
			req.flash('err', 'Datos incorrectos');
			res.redirect('/admin')
		}
	});
};

// exports.index = function(req, res) {

// 	checkAuth
// }

function checkAuth(req, res) {
    if (!req.session.user_id) {
    	return false
    } else {
		return true
    }
}

function authenticate(name, pass, fn) {
	User.findOne({username: name}, function(err, user) {
		if (!user) return fn(new Error('cannot find user'));
		pwd.hash(pass, user.salt, function(err, hash){
			if (err) return fn(err);
			if (hash == user.hash) return fn(null, user);
			fn(new Error('invalid password'));
		})
	})
}

// function checkAuth(req, res, next) {
//     if (!req.session.user_id) {
//        res.send('You are not authorized to view this page');
//     } else {
//      next();
//     }
// }

// // middleware
// function restrict(req, res, next) {
//   if (req.session.user) {
//     next();
//   } else {
//     req.session.error = 'Access denied!';
//     res.redirect('/login');
//   }
// }

// // route with restrict middleware
// app.get('/restricted', restrict, function(req, res){
//   res.send('Wahoo! restricted area');
// });

// app.get('/logout', function(req, res){
//   // destroy the user's session to log them out
//   // will be re-created next request
//   req.session.destroy(function(){
//     res.redirect('/');
//   });
// });

/**
 * Create Admin user
 */
var user = new User();
user.username = "admin";
pwd.hash("admin", function(err, salt, hash) {
  if (err) {
    console.log(err);
  }
  // user.salt = salt;
  user.salt = salt;
  user.hash = hash;
  user.save(function(err) {
    if (err) {
      if (err.code === 11000) {
      	console.log('The user "' + user.username + '" already exists');
      } else {
		console.log(err);
      }
    } else {
      console.log("User saved");
    }
  });
});